import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import StaffingSolutions from './pages/StaffingSolutions';
import Products from './pages/Products';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import TrustedBy from './components/TrustedBy';
import ScrollHandler from './components/ScrollHandler';
import LoginSignup from './components/LoginSignup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import OnlineLearningPlatformDetail from './components/products/OnlineLearningPlatformDetail';
import SmartHealthMonitorDetail from './components/products/SmartHealthMonitorDetail';
import PrecisionFarmingDroneDetail from './components/products/PrecisionFarmingDroneDetail';
import AIChatbotAssistantDetail from './components/products/AIChatbotAssistantDetail';
import CloudSecuritySuiteDetail from './components/products/CloudSecuritySuiteDetail';
import CyberThreatAnalyzerDetail from './components/products/CyberThreatAnalyzerDetail';
import RoboticsResearchKitDetail from './components/products/RoboticsResearchKitDetail';
import AIMlSolutions from './components/services/AIMlSolutions';
import CyberSecurity from './components/services/CyberSecurity';
import Healthcare from './components/services/Healthcare';
import BusinessIntelligence from './components/services/BusinessIntelligence';
import CloudTechnologies from './components/services/CloudTechnologies';
import WebDevelopment from './components/services/WebDevelopment';
import Oracle from './components/services/Oracle';
import SAPSolutions from './components/services/SAPSolutions';
import SASCDM from './components/services/SASCDM';
import PMC from './components/services/PMC';
import WorkforceManagement from './components/services/WorkforceManagement';
import GSI from './components/services/GSI';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import CookieConsent from './components/CookieConsent';
import CookieStatement from './components/CookieStatement';
import WebDev from './components/coursel/WebDev';
import AiMl from './components/coursel/AiMl';
import CybSec from './components/coursel/CyberSec';
import AIInnovationHub from './components/coursel/AIInnovationHub';
import Profile from './pages/Profile';

export const API_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
    return (
        <div className="">
            <ScrollHandler />
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <ScrollHandler />
                                <Home />
                                <About />
                                <Services />
                                <StaffingSolutions />
                                <Products />
                                <Contact />
                                <TrustedBy />
                            </>
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/loginsignup" element={<LoginSignup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/web-development" element={<WebDev />} />
                    <Route path="/ai-ml" element={<AiMl />} />
                    <Route path="/cybersecurity" element={<CybSec />} />
                    <Route path="/ai-innovation-hub" element={<AIInnovationHub />} />
                    <Route path="/products/online-learning-platform" element={<OnlineLearningPlatformDetail />} />
                    <Route path="/products/smart-health-monitor" element={<SmartHealthMonitorDetail />} />
                    <Route path="/products/precision-farming-drone" element={<PrecisionFarmingDroneDetail />} />
                    <Route path="/products/ai-chatbot-assistant" element={<AIChatbotAssistantDetail />} />
                    <Route path="/products/cloud-security-suite" element={<CloudSecuritySuiteDetail />} />
                    <Route path="/products/cyber-threat-analyzer" element={<CyberThreatAnalyzerDetail />} />
                    <Route path="/products/robotics-research-kit" element={<RoboticsResearchKitDetail />} />
                    <Route path="/services/ai-ml-solutions" element={<AIMlSolutions />} />
                    <Route path="/services/cyber-security" element={<CyberSecurity />} />
                    <Route path="/services/healthcare" element={<Healthcare />} />
                    <Route path="/services/business-intelligence" element={<BusinessIntelligence />} />
                    <Route path="/services/cloud-technologies" element={<CloudTechnologies />} />
                    <Route path="/services/web-development" element={<WebDevelopment />} />
                    <Route path="/services/oracle" element={<Oracle />} />
                    <Route path="/services/sap-solutions" element={<SAPSolutions />} />
                    <Route path="/services/sas-cdm" element={<SASCDM />} />
                    <Route path="/services/pmc" element={<PMC />} />
                    <Route path="/services/workforce-management" element={<WorkforceManagement />} />
                    <Route path="/services/gsi" element={<GSI />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/terms" element={<TermsAndPrivacy />} />
                    <Route path="/privacy" element={<TermsAndPrivacy />} />
                    <Route path="/cookies" element={<CookieStatement />} />
                </Routes>
            </main>
            <CookieConsent />
            <Footer />
        </div>
    );
};

export default App;