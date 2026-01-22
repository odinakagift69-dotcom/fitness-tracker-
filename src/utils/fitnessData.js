export const PLANS = {
  lose_weight: {
    title: "Fat Loss & Toning",
    description: "High protein, calorie deficit, and cardio-focused training.",
    meals: [
      { name: "Oatmeal with Berries", calories: 350, type: "Breakfast", image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=60" },
      { name: "Grilled Chicken Salad", calories: 450, type: "Lunch", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=60" },
      { name: "Steamed Fish & Veggies", calories: 400, type: "Dinner", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=60" },
    ],
    workouts: [
      { name: "HIIT Cardio", duration: "20 mins", intensity: "High", image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=500&q=60" },
      { name: "Bodyweight Circuit", duration: "30 mins", intensity: "Medium", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=60" },
    ]
  },
  gain_weight: {
    title: "Muscle Builder",
    description: "High carb, protein surplus, and heavy lifting.",
    meals: [
      { name: "Avocado Toast & Eggs", calories: 550, type: "Breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=500&q=60" },
      { name: "Beef & Rice Bowl", calories: 700, type: "Lunch", image: "https://images.unsplash.com/photo-1547496502-ffa226447e2f?w=500&q=60" },
      { name: "Pasta with Meat Sauce", calories: 800, type: "Dinner", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=60" },
    ],
    workouts: [
      { name: "Heavy Compound Lifts", duration: "45 mins", intensity: "High", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=60" },
      { name: "Hypertrophy Arms/Legs", duration: "40 mins", intensity: "Medium", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=60" },
    ]
  },
  maintain: {
    title: "Balanced Lifestyle",
    description: "Equal macro split to keep you healthy and energized.",
    meals: [
      { name: "Smoothie Bowl", calories: 400, type: "Breakfast", image: "https://images.unsplash.com/photo-1626078436812-e87a36f7fb44?w=500&q=60" },
      { name: "Turkey Wrap", calories: 500, type: "Lunch", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=60" },
      { name: "Stir Fry Tofu", calories: 600, type: "Dinner", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=60" },
    ],
    workouts: [
      { name: "Yoga Flow", duration: "30 mins", intensity: "Low", image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=500&q=60" },
      { name: "Steady Run", duration: "30 mins", intensity: "Medium", image: "https://images.unsplash.com/photo-1552674605-46d531d06585?w=500&q=60" },
    ]
  }
};