import { motion } from 'framer-motion'
import { Code, Shield, BarChart3, Megaphone, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Services = () => {
  const services = [
    {
      id: 'software',
      icon: Code,
      title: 'Software Development',
      description: 'Custom enterprise applications, web platforms, and mobile solutions built with cutting-edge technologies for Fortune 500 companies.',
      features: [
        'Full-Stack Web Development',
        'Mobile App Development (iOS/Android)',
        'Cloud Architecture & Migration',
        'API Development & Integration',
        'DevOps & CI/CD Implementation',
        'Legacy System Modernization'
      ],
      technologies: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
      process: [
        'Requirements Analysis & Planning',
        'System Architecture Design',
        'Agile Development Sprints',
        'Quality Assurance & Testing',
        'Deployment & Go-Live Support',
        'Ongoing Maintenance & Support'
      ],
      pricing: {
        starter: '$50,000 - $150,000',
        enterprise: '$150,000 - $500,000',
        custom: 'Custom Quote'
      }
    },
    {
      id: 'cybersecurity',
      icon: Shield,
      title: 'Cybersecurity Solutions',
      description: 'Comprehensive security frameworks, threat assessment, and compliance solutions designed for government-grade protection.',
      features: [
        'Security Audits & Assessments',
        'Penetration Testing',
        'Compliance Management (SOC 2, HIPAA)',
        'Incident Response Planning',
        'Security Training Programs',
        '24/7 Security Monitoring'
      ],
      technologies: ['SIEM Tools', 'Vulnerability Scanners', 'Firewalls', 'IDS/IPS', 'Encryption', 'Zero Trust'],
      process: [
        'Security Risk Assessment',
        'Vulnerability Identification',
        'Security Framework Design',
        'Implementation & Testing',
        'Staff Training & Documentation',
        'Continuous Monitoring & Updates'
      ],
      pricing: {
        starter: '$25,000 - $75,000',
        enterprise: '$75,000 - $250,000',
        custom: 'Government Contracts Available'
      }
    },
    {
      id: 'data-analytics',
      icon: BarChart3,
      title: 'Data Analytics & AI',
      description: 'Advanced analytics, machine learning models, and business intelligence solutions for data-driven decision making.',
      features: [
        'Predictive Analytics Models',
        'Machine Learning Implementation',
        'Business Intelligence Dashboards',
        'Data Visualization & Reporting',
        'Big Data Processing',
        'AI-Powered Automation'
      ],
      technologies: ['Python', 'TensorFlow', 'Tableau', 'Power BI', 'Apache Spark', 'AWS ML'],
      process: [
        'Data Strategy & Planning',
        'Data Collection & Cleaning',
        'Model Development & Training',
        'Dashboard & Visualization Creation',
        'Deployment & Integration',
        'Performance Monitoring & Optimization'
      ],
      pricing: {
        starter: '$40,000 - $100,000',
        enterprise: '$100,000 - $300,000',
        custom: 'AI Solutions from $500K+'
      }
    },
    {
      id: 'marketing',
      icon: Megaphone,
      title: 'Digital Marketing & Branding',
      description: 'Strategic digital marketing campaigns, brand development, and growth optimization for B2B enterprise market leadership.',
      features: [
        'B2B Digital Marketing Strategy',
        'Search Engine Optimization (SEO)',
        'Pay-Per-Click Advertising (PPC)',
        'Content Marketing & Strategy',
        'Social Media Management',
        'Marketing Analytics & ROI Tracking'
      ],
      technologies: ['Google Ads', 'HubSpot', 'Salesforce', 'Google Analytics', 'SEMrush', 'Marketo'],
      process: [
        'Market Research & Analysis',
        'Brand Strategy Development',
        'Campaign Planning & Creation',
        'Multi-Channel Execution',
        'Performance Tracking & Analysis',
        'Optimization & Scaling'
      ],
      pricing: {
        starter: '$15,000 - $50,000/month',
        enterprise: '$50,000 - $150,000/month',
        custom: 'Enterprise Packages Available'
      }
    }
  ]

  const faqs = [
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary based on complexity. Software development projects typically range from 3-12 months, while cybersecurity assessments can be completed in 4-8 weeks.'
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive support packages including 24/7 monitoring, regular updates, security patches, and dedicated account management.'
    },
    {
      question: 'Can you work with our existing technology stack?',
      answer: 'Absolutely. Our team has extensive experience integrating with existing systems and can work with virtually any technology stack or platform.'
    },
    {
      question: 'What industries do you specialize in?',
      answer: 'We specialize in enterprise clients across finance, healthcare, government, technology, and manufacturing sectors, with particular expertise in regulated industries.'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-gold">Services</span>
            </h1>
            <p className="text-xl text-softgray max-w-4xl mx-auto">
              Comprehensive enterprise solutions designed for Fortune 500 companies and government agencies. 
              From software development to cybersecurity, we deliver excellence at scale.
            </p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 gold-gradient rounded-lg flex items-center justify-center mr-4">
                        <service.icon className="w-8 h-8 text-midnight" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                    </div>
                    
                    <p className="text-softgray text-lg mb-8">{service.description}</p>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-gold mr-3" />
                            <span className="text-softgray">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Our Process</h3>
                      <div className="space-y-4">
                        {service.process.map((step, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center mr-4">
                              <span className="text-midnight font-bold text-sm">{idx + 1}</span>
                            </div>
                            <span className="text-softgray">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Investment Levels</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-white">Starter Package</span>
                          <span className="text-gold font-semibold">{service.pricing.starter}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-white">Enterprise Package</span>
                          <span className="text-gold font-semibold">{service.pricing.enterprise}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-white">Custom Solutions</span>
                          <span className="text-gold font-semibold">{service.pricing.custom}</span>
                        </div>
                      </div>
                    </div>

                    <Link to="/contact" className="btn-primary inline-flex items-center">
                      Get Quote <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="card-luxury">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-softgray">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-softgray mb-8 max-w-3xl mx-auto">
              Transform your business with enterprise-grade solutions. Contact our experts for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Request Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services