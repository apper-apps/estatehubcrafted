import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const stats = [
    { label: "Active Listings", value: "12,543", icon: "Home" },
    { label: "Happy Clients", value: "8,200+", icon: "Users" },
    { label: "Cities Covered", value: "150", icon: "MapPin" },
    { label: "Properties Sold", value: "25,000+", icon: "TrendingUp" }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                <ApperIcon name="Building2" className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                EstateHub
              </h1>
            </motion.div>

            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#search" className="text-surface-600 hover:text-primary transition-colors">Search</a>
                <a href="#listings" className="text-surface-600 hover:text-primary transition-colors">Listings</a>
                <a href="#agents" className="text-surface-600 hover:text-primary transition-colors">Agents</a>
              </nav>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 transition-all duration-200"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-4 h-4 md:w-5 md:h-5 text-surface-600 dark:text-surface-400" 
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white leading-tight">
                Find Your{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Dream Home
                </span>
              </h2>
              <p className="mt-4 md:mt-6 text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-2xl">
                Discover the perfect property with our advanced search platform. From luxury homes to affordable apartments, we connect you with your ideal living space.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Start Searching
                </button>
                <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200">
                  List Property
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=entropy&auto=format"
                  alt="Modern home exterior"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white dark:bg-surface-800 rounded-xl p-3 md:p-4 shadow-soft"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Star" className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold">4.9 Rating</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white dark:bg-surface-800 rounded-xl p-3 md:p-4 shadow-soft"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              >
                <div className="flex items-center space-x-2">
                  <ApperIcon name="TrendingUp" className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold">98% Sold</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white dark:bg-surface-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <ApperIcon name={stat.icon} className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-surface-600 dark:text-surface-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section id="search" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Advanced Property Search
            </h3>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Use our intelligent search filters to find properties that match your exact requirements and budget.
            </p>
          </motion.div>
          
          <MainFeature />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                  <ApperIcon name="Building2" className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-xl font-bold">EstateHub</h4>
              </div>
              <p className="text-surface-300 max-w-md">
                Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with ease and transparency.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Search Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">List Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Agents</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Insights</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-surface-300">
                <li className="flex items-center space-x-2">
                  <ApperIcon name="Phone" className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ApperIcon name="Mail" className="w-4 h-4" />
                  <span>info@estatehub.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  <span>New York, NY</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-700 mt-8 pt-8 text-center text-surface-400">
            <p>&copy; 2024 EstateHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home