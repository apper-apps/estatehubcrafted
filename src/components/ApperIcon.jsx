import * as Icons from 'lucide-react';

// Custom icon mapping for non-standard icon names
const ICON_MAP = {
    'Bath': 'Bath', // If Bath exists in the library, it will be used
    'Square': 'SquareIcon', // Map to the correct icon name
    'Bed': 'Bed', // If Bed exists in the library, it will be used
    'Building2': 'Building2',
    'Heart': 'Heart',
    // Add any other custom mappings here
};

const ApperIcon = ({ name, ...props }) => {
    // Try to get the icon using the mapping, or directly from the library
    const iconName = ICON_MAP[name] || name;
    let IconComponent = Icons[iconName];

    // If the icon doesn't exist, use a safe fallback
    if (!IconComponent) {
        console.warn(`Icon "${name}" (mapped to "${iconName}") does not exist in lucide-react, using Smile as fallback`);
        IconComponent = Icons.Smile || (() => <span>🙂</span>); // Ultra-safe fallback
    }
    return <IconComponent {...props} />;
};

export default ApperIcon;