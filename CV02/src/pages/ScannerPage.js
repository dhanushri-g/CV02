import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X, RotateCcw, Zap, History, Settings } from 'lucide-react';
import { classifyImage } from '../data/wasteCategories';

const ScannerPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [scanHistory, setScanHistory] = useState([]);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Cleanup camera stream on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Start camera with enhanced options
  const startCamera = useCallback(async () => {
    try {
      setError('');
      setIsLoadingCamera(true);

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      // Request camera permissions
      const constraints = {
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: facingMode // Use selected camera (front or back)
        }
      };

      console.log('Requesting camera access...');
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera access granted, setting up video...');

      if (videoRef.current) {
        // Set the video source
        videoRef.current.srcObject = mediaStream;

        // Force video to be visible and playing
        videoRef.current.style.display = 'block';
        videoRef.current.style.visibility = 'visible';

        // Set video properties
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.autoplay = true;

        // Ensure video plays immediately
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded, starting playback...');
          console.log('Video dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);

          videoRef.current.play()
            .then(() => {
              console.log('✅ Video is now playing and should be visible!');
              setStream(mediaStream);
              setIsScanning(true);
              setIsLoadingCamera(false);
              setError(''); // Clear any previous errors
            })
            .catch((playError) => {
              console.error('❌ Error playing video:', playError);
              setError('Unable to start video playback. Please try again.');
              setIsLoadingCamera(false);
            });
        };

        // Handle video errors
        videoRef.current.onerror = (e) => {
          console.error('❌ Video error:', e);
          setError('Video playback error. Please try again.');
          setIsLoadingCamera(false);
        };

        // Additional fallback - try to play immediately
        setTimeout(() => {
          if (videoRef.current && videoRef.current.readyState >= 2) {
            videoRef.current.play().catch(console.error);
          }
        }, 100);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setIsLoadingCamera(false);

      let errorMessage = 'Unable to access camera. ';

      if (err.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions and try again.';
      } else if (err.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (err.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported on this browser.';
      } else {
        errorMessage += 'Please try uploading an image instead.';
      }

      setError(errorMessage);
    }
  }, [facingMode]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
    setCapturedImage(null);
  }, [stream]);

  // Capture photo with enhanced quality
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Ensure video is playing and has dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setError('Camera not ready. Please wait a moment and try again.');
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Clear any previous content
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Apply image enhancements
      context.filter = 'contrast(1.1) brightness(1.05) saturate(1.1)';
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to high-quality JPEG
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageDataUrl);

      // Stop the camera stream after capture
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      setIsScanning(false);

      // Add to scan history
      const newScan = {
        id: Date.now(),
        image: imageDataUrl,
        timestamp: new Date().toLocaleString()
      };
      setScanHistory(prev => [newScan, ...prev.slice(0, 4)]); // Keep last 5 scans

      // Clear any errors
      setError('');
    } else {
      setError('Camera not available. Please try again.');
    }
  }, [stream]);

  // Handle file upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        setIsScanning(false);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
        
        // Add to scan history
        const newScan = {
          id: Date.now(),
          image: e.target.result,
          timestamp: new Date().toLocaleString()
        };
        setScanHistory(prev => [newScan, ...prev.slice(0, 4)]);
      };
      reader.readAsDataURL(file);
    }
  }, [stream]);

  // Process image with AI simulation
  const processImage = useCallback(async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    try {
      const result = await classifyImage(capturedImage);
      navigate('/results', { 
        state: { 
          result,
          image: capturedImage 
        } 
      });
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [capturedImage, navigate]);

  // Reset scan
  const resetScan = useCallback(() => {
    setCapturedImage(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Switch camera (front/back)
  const switchCamera = useCallback(async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);

    // If camera is currently active, restart it with new facing mode
    if (isScanning && stream) {
      // Stop current stream
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsScanning(false);

      // Start camera with new facing mode
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  }, [facingMode, isScanning, stream, startCamera]);

  // Toggle flash
  const toggleFlash = useCallback(async () => {
    try {
      if (stream) {
        const videoTrack = stream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities();

        if (capabilities.torch) {
          await videoTrack.applyConstraints({
            advanced: [{ torch: !flashEnabled }]
          });
          setFlashEnabled(prev => !prev);
        } else {
          setError('Flash not supported on this device.');
        }
      } else {
        setFlashEnabled(prev => !prev);
      }
    } catch (err) {
      console.error('Error toggling flash:', err);
      setError('Unable to control flash.');
    }
  }, [stream, flashEnabled]);

  return (
    <div className="scanner-page">
      <div className="container">
        <div className="scanner-header">
          <h1 className="scanner-title">
            <Zap className="title-icon" />
            Advanced Scanner
          </h1>
          <p className="scanner-description">
            Enhanced AI-powered waste identification with advanced camera features
          </p>
          {isScanning && (
            <div className="camera-status">
              <div className="status-indicator"></div>
              <span>Camera Active - {facingMode === 'user' ? 'Front Camera' : 'Back Camera'}</span>
            </div>
          )}
          {!isScanning && !capturedImage && !error && (
            <div className="scanner-instructions">
              <p>📱 <strong>Camera Tips:</strong></p>
              <ul>
                <li>Allow camera permissions when prompted</li>
                <li>Hold your device steady for best results</li>
                <li>Ensure good lighting for accurate scanning</li>
                <li>Position the waste item clearly in the frame</li>
              </ul>
              <div className="test-camera-section">
                <p><strong>🔧 Test Camera:</strong></p>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    console.log('Testing camera access...');
                    navigator.mediaDevices.getUserMedia({ video: true })
                      .then(stream => {
                        console.log('✅ Camera test successful!', stream);
                        alert('Camera test successful! Your camera is working.');
                        stream.getTracks().forEach(track => track.stop());
                      })
                      .catch(err => {
                        console.error('❌ Camera test failed:', err);
                        alert('Camera test failed: ' + err.message);
                      });
                  }}
                >
                  Test Camera Access
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="scanner-interface">
          {!isScanning && !capturedImage && (
            <div className="scanner-options">
              <div className="main-options">
                <div className="scan-option">
                  <button
                    className="scan-btn camera-btn enhanced"
                    onClick={startCamera}
                    disabled={isLoadingCamera}
                  >
                    {isLoadingCamera ? (
                      <>
                        <div className="spinner enhanced"></div>
                        <span>Starting Camera...</span>
                        <small>Please allow permissions</small>
                      </>
                    ) : (
                      <>
                        <Camera size={40} />
                        <span>Smart Camera</span>
                        <small>AI-enhanced capture</small>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="scan-divider">
                  <span>or</span>
                </div>
                
                <div className="scan-option">
                  <button 
                    className="scan-btn upload-btn enhanced"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={40} />
                    <span>Upload Image</span>
                    <small>High-quality analysis</small>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              {/* Scan History */}
              {scanHistory.length > 0 && (
                <div className="scan-history">
                  <div className="history-header">
                    <History size={20} />
                    <h3>Recent Scans</h3>
                  </div>
                  <div className="history-grid">
                    {scanHistory.map((scan) => (
                      <div 
                        key={scan.id} 
                        className="history-item"
                        onClick={() => setCapturedImage(scan.image)}
                      >
                        <img src={scan.image} alt="Previous scan" />
                        <small>{scan.timestamp}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {isScanning && (
            <div className="camera-interface enhanced">
              <div className="camera-container">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="camera-video"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    backgroundColor: '#000'
                  }}
                />
                <div className="camera-overlay">
                  <div className="scan-frame enhanced">
                    <div className="scan-corners"></div>
                    <div className="scan-grid"></div>
                  </div>
                </div>
                <div className="camera-settings">
                  <button
                    className="setting-btn"
                    onClick={switchCamera}
                    title={`Switch to ${facingMode === 'user' ? 'back' : 'front'} camera`}
                  >
                    <Camera size={20} />
                  </button>
                  <button
                    className={`setting-btn ${flashEnabled ? 'active' : ''}`}
                    onClick={toggleFlash}
                    title="Toggle flash"
                  >
                    <Zap size={20} />
                  </button>
                </div>
              </div>
              
              <div className="camera-controls enhanced">
                <button 
                  className="control-btn cancel-btn"
                  onClick={stopCamera}
                >
                  <X size={24} />
                  Cancel
                </button>
                
                <button 
                  className="control-btn capture-btn enhanced"
                  onClick={capturePhoto}
                >
                  <div className="capture-circle enhanced">
                    <div className="capture-inner"></div>
                  </div>
                </button>
                
                <div className="control-spacer"></div>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="image-preview enhanced">
              <div className="preview-container">
                <img 
                  src={capturedImage} 
                  alt="Captured item" 
                  className="preview-image"
                />
                <div className="preview-overlay">
                  <div className="analysis-indicator">
                    <Zap size={16} />
                    Ready for AI Analysis
                  </div>
                </div>
              </div>
              
              <div className="preview-controls">
                <button 
                  className="control-btn retry-btn"
                  onClick={resetScan}
                  disabled={isProcessing}
                >
                  <RotateCcw size={20} />
                  Retake
                </button>
                
                <button 
                  className="control-btn process-btn enhanced"
                  onClick={processImage}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner enhanced"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      AI Analyze
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {/* Debug Information */}
          {process.env.NODE_ENV === 'development' && (
            <div className="debug-info">
              <p>Debug Info:</p>
              <p>Is Scanning: {isScanning ? 'Yes' : 'No'}</p>
              <p>Stream Active: {stream ? 'Yes' : 'No'}</p>
              <p>Loading Camera: {isLoadingCamera ? 'Yes' : 'No'}</p>
              <p>Facing Mode: {facingMode}</p>
              <p>Video Element: {videoRef.current ? 'Found' : 'Not Found'}</p>
              {videoRef.current && (
                <p>Video Dimensions: {videoRef.current.videoWidth}x{videoRef.current.videoHeight}</p>
              )}
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default ScannerPage;
