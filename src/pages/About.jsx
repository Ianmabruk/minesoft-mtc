import { motion } from 'framer-motion'
import { Users, Target, Award, Globe, Shield } from 'lucide-react'

const About = () => {
  const team = [
    {
      name: 'Alexander Mitchell',
      position: 'Chief Executive Officer',
      bio: 'Former VP of Engineering at Fortune 100 company with 15+ years in enterprise solutions.',
      initials: 'AM'
    },
    {
      name: 'Dr. Sarah Chen',
      position: 'Chief Technology Officer',
      bio: 'PhD in Computer Science, former NASA engineer specializing in AI and cybersecurity.',
      initials: 'SC'
    },
    {
      name: 'Marcus Rodriguez',
      position: 'Head of Cybersecurity',
      bio: 'Ex-NSA cybersecurity expert with government clearance and 20+ years experience.',
      initials: 'MR'
    },
    {
      name: 'Emily Watson',
      position: 'Director of Analytics',
      bio: 'Former McKinsey consultant and data science leader at top-tier tech companies.',
      initials: 'EW'
    }
  ]

  const values = [
    {
      icon: Target,
      title: 'Precision Excellence',
      description: 'Every solution engineered with meticulous attention to detail and enterprise-grade quality.'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Government-level security standards integrated into every aspect of our solutions.'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'Long-term strategic partnerships built on trust, transparency, and exceptional results.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Scalable solutions designed to transform businesses and drive worldwide innovation.'
    }
  ]

  const milestones = [
    { year: '2018', event: 'Founded MTC LTD with vision for enterprise excellence' },
    { year: '2019', event: 'Secured first Fortune 500 client and government contracts' },
    { year: '2020', event: 'Expanded to cybersecurity and achieved SOC 2 compliance' },
    { year: '2021', event: 'Launched AI/ML division and reached 100+ enterprise clients' },
    { year: '2022', event: 'Opened international offices and achieved $50M revenue' },
    { year: '2023', event: 'Recognized as Top Enterprise Solutions Provider' },
    { year: '2024', event: 'Serving 500+ clients with 99.9% satisfaction rate' }
  ]

  const awards = [
    'Fortune 500 Preferred Vendor 2024',
    'Cybersecurity Excellence Award 2023',
    'AI Innovation Leader 2023',
    'Best Enterprise Solutions Provider 2022',
    'Government Contractor of the Year 2022'
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-gold">MTC LTD</span>
            </h1>
            <p className="text-xl text-softgray max-w-4xl mx-auto">
              Founded by industry veterans, MTC LTD represents the pinnacle of enterprise technology solutions, 
              serving Fortune 500 companies and government agencies with uncompromising excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-premium/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-luxury"
            >
              <Target className="w-12 h-12 text-gold mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-softgray text-lg leading-relaxed">
                To engineer transformative technology solutions that empower enterprises and government agencies 
                to achieve unprecedented levels of innovation, security, and operational excellence in an 
                increasingly digital world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-luxury"
            >
              <Globe className="w-12 h-12 text-gold mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-softgray text-lg leading-relaxed">
                To be the global leader in enterprise technology solutions, setting the standard for 
                innovation, security, and client excellence while driving the future of digital transformation 
                across industries worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gold">Values</span>
            </h2>
            <p className="text-xl text-softgray">The principles that drive our excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury text-center"
              >
                <value.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-softgray">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-premium/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Leadership <span className="text-gold">Team</span>
            </h2>
            <p className="text-xl text-softgray">Industry veterans driving innovation and excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-midnight">{member.initials}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-gold font-medium mb-4">{member.position}</p>
                <p className="text-softgray text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gold">Journey</span>
            </h2>
            <p className="text-xl text-softgray">Key milestones in our path to excellence</p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1 card-luxury">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center">
                      <span className="text-midnight font-bold">{milestone.year}</span>
                    </div>
                    <p className="text-white text-lg">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-premium/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Awards & <span className="text-gold">Recognition</span>
            </h2>
            <p className="text-xl text-softgray">Industry recognition for our excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury text-center"
              >
                <Award className="w-12 h-12 text-gold mx-auto mb-4" />
                <p className="text-white font-semibold">{award}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Enterprise Clients' },
              { number: '99.9%', label: 'Client Satisfaction' },
              { number: '150+', label: 'Expert Engineers' },
              { number: '24/7', label: 'Premium Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-softgray">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About