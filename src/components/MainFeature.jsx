import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: 'any',
    listingType: 'any',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    features: []
  })

  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const propertyTypes = [
    { value: 'any', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'villa', label: 'Villa' }
  ]

  const listingTypes = [
    { value: 'any', label: 'Buy or Rent' },
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ]

  const availableFeatures = [
    'Pool', 'Garage', 'Garden', 'Balcony', 'Fireplace', 'Air Conditioning',
    'Gym', 'Security', 'Pet Friendly', 'Furnished'
  ]

  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: 750000,
      type: "apartment",
      listing: "sale",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      features: ["Pool", "Gym", "Security"]
    },
    {
      id: 2,
      title: "Luxury Family Home",
      price: 1250000,
      type: "house",
      listing: "sale",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      features: ["Garden", "Garage", "Pool", "Fireplace"]
    },
    {
      id: 3,
      title: "Cozy Studio Apartment",
      price: 2200,
      type: "apartment",
      listing: "rent",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      features: ["Furnished", "Pet Friendly"]
    },
    {
      id: 4,
      title: "Spacious Townhouse",
      price: 3500,
      type: "townhouse",
      listing: "rent",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      features: ["Garage", "Garden", "Air Conditioning"]
    }
  ]

  const handleInputChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setSearchFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSearch = async () => {
    setIsSearching(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    let filtered = mockProperties.filter(property => {
      // Location filter
      if (searchFilters.location && !property.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
        return false
      }
      
      // Property type filter
      if (searchFilters.propertyType !== 'any' && property.type !== searchFilters.propertyType) {
        return false
      }
      
      // Listing type filter
      if (searchFilters.listingType !== 'any' && property.listing !== searchFilters.listingType) {
        return false
      }
      
      // Price filter
      if (searchFilters.priceMin && property.price < parseInt(searchFilters.priceMin)) {
        return false
      }
      if (searchFilters.priceMax && property.price > parseInt(searchFilters.priceMax)) {
        return false
      }
      
      // Bedrooms filter
      if (searchFilters.bedrooms !== 'any' && property.bedrooms < parseInt(searchFilters.bedrooms)) {
        return false
      }
      
      // Bathrooms filter
      if (searchFilters.bathrooms !== 'any' && property.bathrooms < parseInt(searchFilters.bathrooms)) {
        return false
      }
      
      // Features filter
      if (searchFilters.features.length > 0) {
        const hasAllFeatures = searchFilters.features.every(feature => 
          property.features.includes(feature)
        )
        if (!hasAllFeatures) {
          return false
        }
      }
      
      return true
    })
    
    setSearchResults(filtered)
    setIsSearching(false)
    
    if (filtered.length > 0) {
      toast.success(`Found ${filtered.length} matching properties!`)
    } else {
      toast.error("No properties found matching your criteria")
    }
  }

  const resetFilters = () => {
    setSearchFilters({
      location: '',
      propertyType: 'any',
      listingType: 'any',
      priceMin: '',
      priceMax: '',
      bedrooms: 'any',
      bathrooms: 'any',
      features: []
    })
    setSearchResults([])
    toast.info("Search filters have been reset")
  }

  const formatPrice = (price, listing) => {
    if (listing === 'rent') {
      return `$${price.toLocaleString()}/month`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-6 md:p-8 mb-8"
      >
        {/* Basic Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
              Location
            </label>
            <div className="relative">
              <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                value={searchFilters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter city, state, or ZIP code"
                className="w-full pl-10 pr-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
              Property Type
            </label>
            <select
              value={searchFilters.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
              Listing Type
            </label>
            <select
              value={searchFilters.listingType}
              onChange={(e) => handleInputChange('listingType', e.target.value)}
              className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            >
              {listingTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ApperIcon name={showAdvanced ? "ChevronUp" : "ChevronDown"} className="w-4 h-4" />
            <span className="font-medium">Advanced Filters</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-surface-600 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Search" className="w-4 h-4" />
                  <span>Search Properties</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-600"
            >
              {/* Price Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={searchFilters.priceMin}
                    onChange={(e) => handleInputChange('priceMin', e.target.value)}
                    placeholder="No minimum"
                    className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={searchFilters.priceMax}
                    onChange={(e) => handleInputChange('priceMax', e.target.value)}
                    placeholder="No maximum"
                    className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={searchFilters.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  >
                    <option value="any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={searchFilters.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  >
                    <option value="any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">
                  Features
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableFeatures.map(feature => (
                    <button
                      key={feature}
                      onClick={() => handleFeatureToggle(feature)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        searchFilters.features.includes(feature)
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search Results */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white">
                Search Results ({searchResults.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-surface-800 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-xs font-semibold text-surface-700 uppercase">
                        {property.listing === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(property.price, property.listing)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
                      {property.title}
                    </h4>
                    <p className="text-surface-600 dark:text-surface-400 mb-4 flex items-center">
                      <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                      {property.location}
                    </p>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-surface-600 dark:text-surface-400">
                      <span className="flex items-center">
                        <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                        {property.bedrooms} bed
                      </span>
                      <span className="flex items-center">
                        <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                        {property.bathrooms} bath
                      </span>
                      <span className="flex items-center">
                        <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                        {property.sqft} sqft
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {property.features.slice(0, 3).map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 3 && (
                        <span className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 text-xs rounded-md">
                          +{property.features.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                        <ApperIcon name="Heart" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature