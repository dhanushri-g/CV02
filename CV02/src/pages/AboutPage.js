import React from 'react';
import {
  Users,
  Target,
  Award,
  Heart,
  Leaf,
  Globe,
  Lightbulb,
  Recycle,
  TrendingUp,
  Shield,
  Camera,
  BarChart3,
  GraduationCap,
  RefreshCw,
  CheckCircle,
  Bot,
  Earth
} from 'lucide-react';

const AboutPage = () => {
  const whatWeDo = [
    {
      icon: <Camera className="feature-icon" />,
      title: 'AI-Powered Recognition',
      description: 'Use AI to recognize waste and guide you to the right bin'
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      title: 'Smart Insights',
      description: 'Provide insights to help people and cities manage waste better'
    },
    {
      icon: <GraduationCap className="feature-icon" />,
      title: 'Education & Awareness',
      description: 'Educate users on sustainable habits and environmental responsibility'
    },
    {
      icon: <RefreshCw className="feature-icon" />,
      title: 'Circular Economy',
      description: 'Encourage a shift toward a zero-waste, circular economy'
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="benefit-icon" />,
      text: 'Simple'
    },
    {
      icon: <CheckCircle className="benefit-icon" />,
      text: 'Accurate'
    },
    {
      icon: <CheckCircle className="benefit-icon" />,
      text: 'Accessible to all'
    }
  ];



  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              🌱 About Us – <span className="highlight">Greenify</span>
            </h1>
            <p className="hero-description">
              At Greenify, we believe that solving the waste problem starts with one small action: sorting waste correctly.
              But for many people, knowing what goes where can be confusing. That's where we come in.
            </p>
            <p className="hero-description">
              We've created a smart waste segregation app that uses AI-powered image recognition to tell you if something
              is recyclable, compostable, or general waste — instantly. Just snap a picture or scan an item, and Greenify
              gives you the answer. No guessing. No mistakes.
            </p>
          </div>
        </div>
      </section>

      {/* Movement Section */}
      <section className="movement-section">
        <div className="container">
          <div className="movement-content">
            <h2 className="section-title">We're Not Just an App — We're a Movement</h2>
            <p className="movement-description">
              A movement towards cleaner homes, smarter cities, and a greener planet. We work with communities,
              schools, local governments, and eco-conscious individuals to make waste sorting:
            </p>
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  {benefit.icon}
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <div className="container">
          <h2 className="section-title">🤖 What We Do</h2>
          <div className="features-grid">
            {whatWeDo.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="why-exist-section">
        <div className="container">
          <div className="why-exist-content">
            <h2 className="section-title">💡 Why We Exist</h2>
            <p className="why-exist-description">
              Every year, millions of tons of recyclable waste end up in landfills — just because it wasn't sorted properly.
              Greenify exists to change that.
            </p>
            <p className="why-exist-description">
              We believe that <strong>technology + awareness</strong> can fix a broken system and turn waste into opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Join Movement Section */}
      <section className="join-movement-section">
        <div className="container">
          <div className="join-movement-content">
            <h2 className="section-title">🔁 Join the Movement</h2>
            <p className="join-movement-description">
              Whether you're an individual trying to sort your trash better, a school wanting to teach sustainability,
              or a city looking to manage waste more efficiently — Greenify is for you.
            </p>
            <div className="movement-goals">
              <div className="goal-item">
                <Earth className="goal-icon" />
                <p>Together, we can turn trash into something meaningful.</p>
              </div>
              <div className="goal-item">
                <Leaf className="goal-icon" />
                <p>Together, we can Greenify the future. 🌍</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <Heart className="cta-icon" />
            <h2 className="cta-title">Start Your Greenify Journey</h2>
            <p className="cta-description">
              Ready to make a difference? Join thousands of users who are already making waste sorting simple,
              accurate, and impactful. Together, we can build a cleaner, greener future.
            </p>
            <div className="cta-buttons">
              <a href="/scanner" className="btn btn-primary">
                <Bot className="btn-icon" />
                Start AI Scanning
              </a>
              <a href="/shop" className="btn btn-secondary">
                <Recycle className="btn-icon" />
                Shop Eco Products
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
