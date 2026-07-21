// AIEngine.js - Core Mathematical Logic for QuickBite AI Features

/**
 * 1. Semantic Search (TF-IDF Simulation)
 * Maps natural language queries to item descriptions and ingredients.
 */
export const semanticSearch = (query, items) => {
  if (!query) return items;

  const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const searchTerms = normalize(query).split(' ').filter(t => t.length > 1);

  if (searchTerms.length === 0) return items;

  const scoredItems = items.map(item => {
    let score = 0;
    const document = normalize(`${item.name} ${item.description} ${item.ingredients}`);
    
    searchTerms.forEach(term => {
      // Basic Term Frequency: count occurrences of term in document
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const matches = document.match(regex);
      if (matches) {
        // Boost score if term appears in title
        score += matches.length * (normalize(item.name).includes(term) ? 2 : 1);
      }
    });

    return { ...item, _searchScore: score };
  });

  return scoredItems
    .filter(item => item._searchScore > 0)
    .sort((a, b) => b._searchScore - a._searchScore);
};

/**
 * 2. Recommendation Engine (Content-Based Filtering via Jaccard Similarity)
 * Suggests items similar to the user's favorites or order history.
 */
export const getRecommendations = (allItems, userFavorites) => {
  if (!userFavorites || userFavorites.length === 0) {
    // Cold start: return top rated items
    return [...allItems].sort((a, b) => b.average_rating - a.average_rating).slice(0, 3);
  }

  // Extract all ingredients from user's favorites
  const favoriteIngredients = new Set();
  userFavorites.forEach(fav => {
    fav.ingredients.split(', ').forEach(ing => favoriteIngredients.add(ing.trim().toLowerCase()));
  });

  const scoredItems = allItems.map(item => {
    // Don't recommend items already in favorites for discovery purposes (optional, but good practice)
    if (userFavorites.some(f => f.id === item.id)) return { ...item, _recScore: -1 };

    const itemIngredients = new Set(item.ingredients.split(', ').map(i => i.trim().toLowerCase()));
    
    // Jaccard Similarity: Intersection over Union
    let intersection = 0;
    itemIngredients.forEach(ing => {
      if (favoriteIngredients.has(ing)) intersection++;
    });

    const union = favoriteIngredients.size + itemIngredients.size - intersection;
    const score = union === 0 ? 0 : intersection / union;

    return { ...item, _recScore: score };
  });

  return scoredItems
    .filter(item => item._recScore > 0)
    .sort((a, b) => b._recScore - a._recScore)
    .slice(0, 4); // Top 4 recommendations
};

/**
 * 3. Dynamic Prep-Time (Multiple Linear Regression Simulation)
 * Predicts prep time based on cart complexity.
 */
export const predictPrepTime = (cartItems) => {
  if (cartItems.length === 0) return 0;

  const baseTime = 15; // 15 mins base
  const timePerItem = 3.5; 
  let totalQuantity = 0;
  let complexityMultiplier = 0;

  cartItems.forEach(item => {
    const qty = item.prices.reduce((acc, p) => acc + p.quantity, 0);
    totalQuantity += qty;
    // Burgers are slightly faster than Pizzas
    complexityMultiplier += item.type === 'Pizza' ? 1.2 * qty : 0.8 * qty;
  });

  // Simulated Regression Formula: y = B0 + B1*x1 + B2*x2
  const predictedMinutes = Math.round(baseTime + (timePerItem * totalQuantity) + (complexityMultiplier * 2));
  
  return predictedMinutes;
};

/**
 * 4. Smart Cart Association (Apriori Heuristic)
 * Finds "Frequently Bought Together" items.
 */
export const getSmartCartSuggestions = (cartItems, allItems) => {
  if (cartItems.length === 0) return [];

  // Simple Apriori Heuristic: 
  // If cart has Pizza, suggest a specific high-rated Burger or different type.
  // We'll just suggest items NOT in the cart, prioritizing opposite types.
  
  const cartIds = new Set(cartItems.map(i => i.id));
  const hasPizza = cartItems.some(i => i.type === 'Pizza');
  const hasBurger = cartItems.some(i => i.type === 'Burger');

  let suggestions = allItems.filter(i => !cartIds.has(i.id));

  // Boost score for cross-selling
  const scoredSuggestions = suggestions.map(item => {
    let score = item.average_rating; // base score
    if (hasPizza && item.type === 'Burger') score += 2;
    if (hasBurger && item.type === 'Pizza') score += 2;
    return { ...item, _assocScore: score };
  });

  return scoredSuggestions
    .sort((a, b) => b._assocScore - a._assocScore)
    .slice(0, 3); // Top 3 cross-sells
};
