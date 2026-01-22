// src/utils/fitnessLogic.js

/**
 * Calculates Body Mass Index (BMI)
 * Formula: Weight (kg) / (Height (m) * Height (m))
 */
export const calculateBMI = (weight, heightCm) => {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  return bmi.toFixed(1); // Returns "22.5" instead of "22.5342..."
};

/**
 * Returns the BMI Category based on the score
 */
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal Weight";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
};

/**
 * Calculates Daily Calories (TDEE)
 * Uses the Mifflin-St Jeor Equation
 */
export const calculateDailyCalories = (data) => {
  const { gender, currentWeight, height, age, activityLevel, goal } = data;
  
  // 1. Calculate BMR (Basal Metabolic Rate) - Energy burned at rest
  let bmr;
  if (gender === 'male') {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
  }

  // 2. Multiplier based on Activity Level
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };
  
  const maintenanceCalories = bmr * (activityMultipliers[activityLevel] || 1.2);

  // 3. Adjust for Goal (Lose/Gain weight)
  // Standard rule: +/- 500 calories per day = 0.5kg per week
  if (goal === 'lose_weight') return Math.round(maintenanceCalories - 500);
  if (goal === 'gain_weight') return Math.round(maintenanceCalories + 500);
  
  return Math.round(maintenanceCalories); // Maintain weight
};