import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const QAServices = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const qaServices = [
        {
            id: 1,
            title: "API Testing Services",
            description: "We test APIs for functionality, reliability, performance, and security, ensuring seamless integration and communication between software systems using automated and manual techniques.",
            icon: "code",
            color: "#3B82F6",
        },
        {
            id: 2,
            title: "Artificial Intelligence Testing Services",
            description: "Our advanced lab rigorously tests and validates AI-powered applications for accuracy and performance, ensuring reliable and effective AI integration.",
            icon: "brain",
            color: "#10B981",
        },
        {
            id: 3,
            title: "Blockchain Testing Services",
            description: "We conduct comprehensive testing of blockchain applications, including smart contracts and decentralized networks, for functionality, security, and performance.",
            icon: "link",
            color: "#6366F1",
        },
        {
            id: 4,
            title: "Cloud-based Application Testing Services",
            description: "Elevate your software quality with our premier Cloud-based application testing services, ensuring a refined user experience and reliable software performance.",
            icon: "cloud",
            color: "#60A5FA",
        },
        {
            id: 5,
            title: "Load and Performance Testing Services",
            description: "We assess software performance under various load conditions to ensure reliability, scalability, and stability under peak usage.",
            icon: "trending-up",
            color: "#F59E0B",
        },
        {
            id: 6,
            title: "Manual Testing Services",
            description: "We conduct manual testing to ensure software functionality, usability, and compliance with specified requirements.",
            icon: "search",
            color: "#EC4899",
        },
        {
            id: 7,
            title: "Mobile App Testing Services",
            description: "We test mobile applications across various devices and operating systems to ensure optimal performance, usability, and user experience.",
            icon: "smartphone",
            color: "#8B5CF6",
        },
        {
            id: 8,
            title: "QA Consulting and Analysis Services",
            description: "We provide expert QA consulting to identify and address gaps in testing processes, aligning QA strategies with business objectives and industry best practices.",
            icon: "pie-chart",
            color: "#14B8A6",
        },
        {
            id: 9,
            title: "Salesforce Testing Services",
            description: "We test Salesforce's customized and built-in features to ensure they function according to business requirements and customer expectations.",
            icon: "cloud-lightning",
            color: "#0EA5E9",
        },
        {
            id: 10,
            title: "Security Testing Services",
            description: "We identify vulnerabilities and security gaps in software applications to protect against threats and ensure data integrity and confidentiality.",
            icon: "shield",
            color: "#EF4444",
        },
        {
            id: 11,
            title: "Test Automation Services",
            description: "We implement automated testing processes to streamline QA workflows, increase efficiency, and reduce manual effort in software testing.",
            icon: "zap",
            color: "#F97316",
        },
    ];

    const IconComponent = ({ name }) => {
        const icons = {
            code: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
            ),
            brain: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
            ),
            link: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
            ),
            cloud: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                </svg>
            ),
            "trending-up": (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
            ),
            search: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            ),
            smartphone: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
            ),
            "pie-chart": (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
            ),
            "cloud-lightning": (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 16l-7 -7m0 0l-7 7m7 -7v18"></path>
                </svg>
            ),
            shield: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
            ),
            zap: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            ),
        };

        return icons[name] || null;
    };

    const qaProcessSteps = [
        {
            id: 1,
            title: "Requirements Analysis",
            description: "We deeply understand your project's unique needs by analyzing business objectives, technical specifications, and end-user expectations to craft a testing strategy aligned with your goals.",
            icon: "clipboard-check",
            color: "#3B82F6",
        },
        {
            id: 2,
            title: "Test Planning",
            description: "We develop a detailed test plan outlining our tailored approach to testing, ensuring every aspect of your software is meticulously examined and validated.",
            icon: "document-text",
            color: "#10B981",
        },
        {
            id: 3,
            title: "Test Design",
            description: "Our team designs comprehensive test cases covering functional and non-functional aspects of your software, identifying potential issues early and prioritizing tests based on criticality.",
            icon: "template",
            color: "#8B5CF6",
        },
        {
            id: 4,
            title: "Test Execution",
            description: "We execute the designed test cases, meticulously recording results and tracking defects discovered, collaborating closely with your development team to address issues promptly.",
            icon: "play",
            color: "#EC4899",
        },
        {
            id: 5,
            title: "Test Reporting",
            description: "We provide regular, detailed reports offering insights into testing progress, including issue status, tests completed, and overall testing milestones.",
            icon: "chart-bar",
            color: "#F59E0B",
        },
        {
            id: 6,
            title: "Test Automation",
            description: "We employ advanced automation tools to enhance efficiency, automating repetitive tests and allowing our team to focus on more complex aspects requiring manual attention.",
            icon: "cog",
            color: "#6366F1",
        },
        {
            id: 7,
            title: "Continuous Improvement",
            description: "We continuously evaluate and adapt our QA methodologies to maintain the highest standards of quality and efficiency in our testing services.",
            icon: "refresh",
            color: "#14B8A6",
        },
    ];

    const ProcessIconComponent = ({ name }) => {
        const icons = {
            "clipboard-check": (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
            ),
            "document-text": (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
            template: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
            ),
            play: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
            "chart-bar": (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            ),
            cog: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            ),
            refresh: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            ),
        };

        return icons[name] || null;
    };

    const benefits = [
        {
            id: 1,
            title: "Improved Software Quality",
            description: "Identify and fix issues before they reach your customers, ensuring high-quality software releases.",
        },
        {
            id: 2,
            title: "Cost Reduction",
            description: "Prevent expensive fixes by catching bugs early in the development lifecycle.",
        },
        {
            id: 3,
            title: "Enhanced User Experience",
            description: "Deliver software that meets or exceeds user expectations by thoroughly testing functionality and usability.",
        },
        {
            id: 4,
            title: "Accelerated Time to Market",
            description: "Streamline development cycles with efficient testing processes and automation.",
        },
        {
            id: 5,
            title: "Risk Mitigation",
            description: "Identify potential security vulnerabilities and performance issues before deployment.",
        },
        {
            id: 6,
            title: "Regulatory Compliance",
            description: "Ensure your software meets industry standards and regulatory requirements through comprehensive testing.",
        },
    ];

    const faqs = [
        {
            id: 1,
            question: "What exactly are quality assurance services?",
            answer: "Quality assurance services are critical in ensuring software is defect-free, aligns with quality standards, and functions as intended. The primary objective of these services is to improve the efficiency and effectiveness of software development processes, guaranteeing a high-quality end product.",
        },
        {
            id: 2,
            question: "What benefits does quality assurance offer?",
            answer: "Quality assurance offers numerous benefits including improved software quality, reduced development costs by catching issues early, enhanced user satisfaction, faster time to market, mitigated risks, and ensured compliance with industry standards and regulations.",
        },
        {
            id: 3,
            question: "How can QA testing services contribute to business growth?",
            answer: "QA testing services contribute to business growth by ensuring reliable products that enhance customer satisfaction and loyalty, reducing maintenance costs, accelerating development cycles for faster market entry, enabling businesses to maintain competitive edge, and protecting brand reputation by preventing critical software failures.",
        },
        {
            id: 4,
            question: "Why is QASource considered a leading provider of software quality assurance?",
            answer: "Our QA services stand out due to our team of 1000+ skilled engineers with specialized domain knowledge, tailored testing solutions for your specific needs, advanced testing infrastructure, seamless integration with your development teams, Agile and DevOps methodologies for dynamic testing, proven track record of client satisfaction, and cost-effective, scalable services with the highest security standards.",
        },
        {
            id: 5,
            question: "When should QA testing begin in the development lifecycle?",
            answer: "QA testing should ideally begin early in the development lifecycle, following the shift-left approach. By integrating testing from the requirements and design phases, issues can be identified and addressed earlier, reducing the cost and effort of fixes compared to discovering them later in development or after release.",
        },
        {
            id: 6,
            question: "How do you handle test automation for complex applications?",
            answer: "For complex applications, we employ a strategic approach to test automation that includes careful selection of test cases for automation, using appropriate frameworks and tools based on the application's technology stack, implementing a modular and maintainable test architecture, and combining automated testing with manual testing for areas where human judgment is necessary.",
        },
    ];

    const whyChooseQASource = [
        {
            id: 1,
            title: "Expertise in Diverse Testing Domains",
            description: "Our team comprises over 1100 skilled engineers, each bringing specialized knowledge in various testing domains, from mobile and API testing to complex blockchain and AI application testing.",
        },
        {
            id: 2,
            title: "Customized Testing Solutions",
            description: "We tailor our QA testing services to fit the specific requirements of your project, ensuring that every aspect of your software is thoroughly tested and validated.",
        },
        {
            id: 3,
            title: "Advanced Testing Infrastructure",
            description: "Our state-of-the-art testing lab has the latest tools and technologies, enabling comprehensive and efficient testing across various platforms and environments.",
        },
        {
            id: 4,
            title: "Seamless Integration With Development Teams",
            description: "Our optimized communication protocols ensure that our team functions as an extension of your in-house team, facilitating better coordination and faster results.",
        },
        {
            id: 5,
            title: "Proven Methodologies and Agile Practices",
            description: "Leveraging Agile and DevOps methodologies, we ensure that our testing processes are dynamic and flexible, allowing for continuous testing and rapid adaptation to changing requirements.",
        },
        {
            id: 6,
            title: "High Client Satisfaction and Retention",
            description: "Our commitment to quality and client satisfaction is reflected in our high client retention rates, building lasting partnerships with consistent value and excellence.",
        },
    ];


    return (
        <div className="bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="pt-20 pb-16 md:pt-28 md:pb-24"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
                            Quality Assurance
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 to-indigo-900 bg-clip-text text-transparent">
                            Software QA Services
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
                            Optimize your applications with our expert software quality assurance services. Over 1100 engineers, 24+ years of domain expertise, and advanced testing labs ensure comprehensive testing and seamless integration with your development teams for optimized output and speed.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Services List */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-indigo-900 bg-clip-text text-transparent">
                                Our Comprehensive QA Services
                            </h2>
                            <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
                                We offer a wide range of quality assurance services to meet the needs of modern software development, ensuring your applications are reliable, secure, and perform optimally.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                            {qaServices.map((service) => (
                                <motion.div
                                    key={service.id}
                                    variants={fadeIn}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                                >
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: `${service.color}15` }}
                                    >
                                        <div className="text-base" style={{ color: service.color }}>
                                            <IconComponent name={service.icon} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-indigo-900 bg-clip-text text-transparent">
                                Our Software QA Testing Process
                            </h2>
                            <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
                                We've honed a comprehensive and dynamic quality assurance process that ensures the highest software quality standards. Our approach combines strategic planning, innovative testing methodologies, and a deep commitment to excellence.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {qaProcessSteps.map((step) => (
                                <motion.div
                                    key={step.id}
                                    variants={fadeIn}
                                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center mb-4">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                                            style={{ backgroundColor: `${step.color}15` }}
                                        >
                                            <div style={{ color: step.color }}>
                                                <ProcessIconComponent name={step.icon} />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-indigo-900 bg-clip-text text-transparent">
                                Benefits of Our QA Services
                            </h2>
                            <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
                                Our QA services deliver measurable benefits that enhance your software development process and final product quality.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit) => (
                                <motion.div
                                    key={benefit.id}
                                    variants={fadeIn}
                                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose QASource Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-indigo-900 bg-clip-text text-transparent">
                                Why Choose QASource for Your QA Needs
                            </h2>
                            <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
                                QASource stands out as a leader in software QA and testing, offering expertise, innovation, and client-focused solutions.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {whyChooseQASource.map((reason) => (
                                <motion.div
                                    key={reason.id}
                                    variants={fadeIn}
                                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{reason.title}</h3>
                                    <p className="text-gray-600">{reason.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-indigo-900 bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
                                Get answers to common questions about our QA services and how we can help you achieve your software quality goals.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {faqs.map((faq) => (
                                <motion.div
                                    key={faq.id}
                                    variants={fadeIn}
                                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default QAServices;