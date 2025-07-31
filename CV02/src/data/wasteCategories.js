// Waste categories with disposal tips and information
export const wasteCategories = {
  plastic: {
    id: 'plastic',
    name: 'Plastic',
    color: '#3B82F6',
    icon: '♻️',
    description: 'Recyclable plastic materials',
    disposalTips: [
      'Clean containers before recycling',
      'Remove caps and lids if required by local facility',
      'Check recycling numbers (1-7) for acceptance',
      'Avoid putting in regular trash'
    ],
    examples: ['Water bottles', 'Food containers', 'Shopping bags', 'Yogurt cups'],
    recyclingInfo: {
      process: 'Melted down and reformed into new products',
      newProducts: ['New bottles', 'Clothing fibers', 'Carpeting', 'Park benches'],
      energySaved: '70% less energy than making new plastic'
    }
  },
  organic: {
    id: 'organic',
    name: 'Organic/Compostable',
    color: '#10B981',
    icon: '🌱',
    description: 'Biodegradable organic waste',
    disposalTips: [
      'Compost at home if possible',
      'Use designated organic waste bins',
      'Avoid meat and dairy in home composting',
      'Keep separate from other waste types'
    ],
    examples: ['Fruit peels', 'Vegetable scraps', 'Coffee grounds', 'Yard trimmings'],
    recyclingInfo: {
      process: 'Decomposed into nutrient-rich compost',
      newProducts: ['Soil amendment', 'Fertilizer', 'Mulch'],
      energySaved: 'Reduces methane emissions from landfills'
    }
  },
  ewaste: {
    id: 'ewaste',
    name: 'E-Waste',
    color: '#8B5CF6',
    icon: '📱',
    description: 'Electronic waste and components',
    disposalTips: [
      'Take to certified e-waste recycling centers',
      'Remove personal data before disposal',
      'Never put in regular trash',
      'Check for manufacturer take-back programs'
    ],
    examples: ['Old phones', 'Computers', 'Batteries', 'Cables'],
    recyclingInfo: {
      process: 'Disassembled and materials recovered',
      newProducts: ['New electronics', 'Precious metals', 'Rare earth elements'],
      energySaved: 'Prevents toxic materials from entering landfills'
    }
  },
  paper: {
    id: 'paper',
    name: 'Paper',
    color: '#F59E0B',
    icon: '📄',
    description: 'Paper and cardboard materials',
    disposalTips: [
      'Keep dry and clean',
      'Remove tape and staples',
      'Flatten cardboard boxes',
      'Separate from other materials'
    ],
    examples: ['Newspapers', 'Magazines', 'Cardboard boxes', 'Office paper'],
    recyclingInfo: {
      process: 'Pulped and reformed into new paper products',
      newProducts: ['New paper', 'Cardboard', 'Tissue products'],
      energySaved: '60% less energy than making new paper'
    }
  },
  glass: {
    id: 'glass',
    name: 'Glass',
    color: '#06B6D4',
    icon: '🍶',
    description: 'Glass bottles and containers',
    disposalTips: [
      'Rinse containers clean',
      'Remove caps and lids',
      'Separate by color if required',
      'Handle carefully to avoid breakage'
    ],
    examples: ['Wine bottles', 'Jam jars', 'Beer bottles', 'Food containers'],
    recyclingInfo: {
      process: 'Melted down and reformed',
      newProducts: ['New bottles', 'Jars', 'Fiberglass', 'Decorative items'],
      energySaved: '30% less energy than making new glass'
    }
  },
  metal: {
    id: 'metal',
    name: 'Metal',
    color: '#6B7280',
    icon: '🥫',
    description: 'Metal cans and containers',
    disposalTips: [
      'Rinse clean of food residue',
      'Remove labels if possible',
      'Crush cans to save space',
      'Separate aluminum from steel if required'
    ],
    examples: ['Aluminum cans', 'Steel cans', 'Tin containers', 'Metal lids'],
    recyclingInfo: {
      process: 'Melted down and reformed',
      newProducts: ['New cans', 'Car parts', 'Construction materials'],
      energySaved: '95% less energy for aluminum, 75% for steel'
    }
  }
};

// Dummy images mapping for simulation
export const dummyImages = {
  plastic: [
    { name: 'water-bottle.jpg', category: 'plastic', confidence: 95 },
    { name: 'plastic-container.jpg', category: 'plastic', confidence: 88 },
    { name: 'shopping-bag.jpg', category: 'plastic', confidence: 92 }
  ],
  organic: [
    { name: 'apple-core.jpg', category: 'organic', confidence: 97 },
    { name: 'vegetable-scraps.jpg', category: 'organic', confidence: 89 },
    { name: 'coffee-grounds.jpg', category: 'organic', confidence: 85 }
  ],
  ewaste: [
    { name: 'old-phone.jpg', category: 'ewaste', confidence: 99 },
    { name: 'computer-parts.jpg', category: 'ewaste', confidence: 94 },
    { name: 'batteries.jpg', category: 'ewaste', confidence: 96 }
  ],
  paper: [
    { name: 'newspaper.jpg', category: 'paper', confidence: 91 },
    { name: 'cardboard-box.jpg', category: 'paper', confidence: 87 },
    { name: 'office-paper.jpg', category: 'paper', confidence: 93 }
  ],
  glass: [
    { name: 'wine-bottle.jpg', category: 'glass', confidence: 98 },
    { name: 'jam-jar.jpg', category: 'glass', confidence: 90 },
    { name: 'beer-bottle.jpg', category: 'glass', confidence: 95 }
  ],
  metal: [
    { name: 'aluminum-can.jpg', category: 'metal', confidence: 96 },
    { name: 'steel-can.jpg', category: 'metal', confidence: 88 },
    { name: 'tin-container.jpg', category: 'metal', confidence: 92 }
  ]
};

// Get random dummy image for simulation
export const getRandomDummyImage = () => {
  const categories = Object.keys(dummyImages);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryImages = dummyImages[randomCategory];
  const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];

  return {
    ...randomImage,
    category: wasteCategories[randomImage.category]
  };
};

// Simulate image classification
export const classifyImage = (imageFile) => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      const result = getRandomDummyImage();
      resolve(result);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
  });
};
