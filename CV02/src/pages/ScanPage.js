import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X, RotateCcw, Check } from 'lucide-react';
import { classifyImage } from '../data/wasteCategories';

const ScanPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsScanning(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions or try uploading an image instead.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
    setCapturedImage(null);
  }, [stream]);

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
    }
  }, []);

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
      };
      reader.readAsDataURL(file);
    }
  }, [stream]);

  // Process image (simulate AI classification)
  const processImage = useCallback(async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    try {
      // Simulate image classification
      const result = await classifyImage(capturedImage);

      // Navigate to results page with the classification result
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

  // Reset to start over
  const resetScan = useCallback(() => {
    setCapturedImage(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="scan-page">
      <div className="container">
        <div className="scan-header">
          <h1 className="scan-title">Scan Your Waste Item</h1>
          <p className="scan-description">
            Use your camera to take a photo or upload an image to identify the waste category
          </p>
        </div>

        <div className="scan-interface">
          {!isScanning && !capturedImage && (
            <div className="scan-options">
              <div className="scan-option">
                <button
                  className="scan-btn camera-btn"
                  onClick={startCamera}
                >
                  <Camera size={32} />
                  <span>Use Camera</span>
                </button>
                <p className="scan-option-desc">Take a photo with your device camera</p>
              </div>

              <div className="scan-divider">
                <span>or</span>
              </div>

              <div className="scan-option">
                <button
                  className="scan-btn upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={32} />
                  <span>Upload Image</span>
                </button>
                <p className="scan-option-desc">Choose an image from your device</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          )}

          {isScanning && (
            <div className="camera-interface">
              <div className="camera-container">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="camera-video"
                />
                <div className="camera-overlay">
                  <div className="scan-frame"></div>
                </div>
              </div>

              <div className="camera-controls">
                <button
                  className="control-btn cancel-btn"
                  onClick={stopCamera}
                >
                  <X size={24} />
                  Cancel
                </button>

                <button
                  className="control-btn capture-btn"
                  onClick={capturePhoto}
                >
                  <div className="capture-circle"></div>
                </button>

                <div className="control-spacer"></div>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="image-preview">
              <div className="preview-container">
                <img
                  src={capturedImage}
                  alt="Captured item"
                  className="preview-image"
                />
              </div>

              <div className="preview-controls">
                <button
                  className="control-btn retry-btn"
                  onClick={resetScan}
                  disabled={isProcessing}
                >
                  <RotateCcw size={20} />
                  Try Again
                </button>

                <button
                  className="control-btn process-btn"
                  onClick={processImage}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Identify Item
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
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default ScanPage;
