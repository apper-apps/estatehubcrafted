import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
            <ApperIcon name="Home" className="w-12 h-12 md:w-16 md:h-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
            Property Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-8">
            Sorry, the page you are looking for doesn't exist. Let's get you back to finding your dream home.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound