const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail.com$/;
  if (!email) {
    return 'Email is required.';
  }
  if (!emailPattern.test(email)) {
    return 'Please enter a valid email address.';
  }
  return '';
};

const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  const hasLettersAndNumbers = /[a-zA-Z]/.test(password) && /\d/.test(password);
  if (!hasLettersAndNumbers) {
    return 'Password must contain both letters and numbers.';
  }
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character.';
  }
  return '';
};

const validateUsername = (username) => {
  if (!username) {
    return 'Username is required.';
  }
  if (username.length < 3 || username.length > 20) {
    return 'Username must be between 3 and 20 characters.';
  }
  const usernamePattern = /^[a-zA-Z0-9]+$/;
  if (!usernamePattern.test(username)) {
    return 'Username must only contain letters and numbers.';
  }
  return '';
};


const validatePlayerInput = (name, value,playerData) => {
  const error = {};
  
  switch (name) {
      // General Validations
      case "full_name":
          if (!value || value.trim() === "") {
              error[name] = "Full Name is required.";
          }
          else if (value.trim().length < 3 || value.trim().length > 30) {
              error[name] = "Full Name must be between 3 and 30 characters.";
          }
          else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
              error[name] = "Full Name should only contain letters and spaces.";
          }
          else if (value.trim().split(" ").length < 2) {
              error[name] = "Full Name must consist of at least 2 words.";
          }
        
          break;

      // Image URL validation using regex (simple URL validation)
      case "image":
        const imageRegex = /\.(jpg|jpeg|png)$/i;
        if (!value) {
            error[name] = "Image is required.";
        } else if (value.name && !imageRegex.test(value.name)) {
            error[name] = "Invalid file type. Only JPG, JPEG, and PNG are allowed.";
        } else if (value.size && value.size > 2 * 1024 * 1024) {
            error[name] = "File size must be less than 2MB.";
        }
        break;

      case "birth_date":
          if (!value || new Date(value) > new Date()) {
              error[name] = "Birth Date is invalid or in the future.";
          }
          
          break;

      case "age":
        if (!value || value < 15 || value > 45) {
          error[name] = "Age must be between 15 and 45.";
      } else if (playerData.birth_date) {
          const birthDate = new Date(playerData.birth_date);
          const currentDate = new Date();
          
          // Calculate the age based on the difference in years
          const calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
          const hasBirthdayPassedThisYear =
              currentDate.getMonth() > birthDate.getMonth() || 
              (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());
          
          // Adjust the age if the birthday hasn't occurred yet this year
          const adjustedAge = hasBirthdayPassedThisYear ? calculatedAge : calculatedAge - 1;
  
          if (adjustedAge !== Number(value)) {
              error[name] = "Age does not match the birth date.";
          }
      }
      break;

      case "height_cm":
          if (!value || value < 150 || value > 220) {
              error[name] = "Height must be between 150 cm and 220 cm.";
          }
          break;

      case "weight_kgs":
          if (!value || value < 50 || value > 120) {
              error[name]= "Weight must be between 50 kg and 120 kg.";
          }
          break;

      case "positions":
          if (!value || value.trim() === "") {
              error[name] = "Positions field is required.";
          } else {
              const positionRegex = /^[A-Za-z\s,]+$/; // Only letters, spaces, and commas
              if (!positionRegex.test(value)) {
                  error[name]= "Positions should only contain letters, spaces, and commas.";
              }
          }
          break;

      case "nationality":
          if (!value || value.trim() === "") {
              error[name] = "Nationality is required.";
          }else if (!/^[A-Za-z\s]+$/.test(value)) {
            error[name] = "Nationality should only contain letters.";
        }
          break;

      // Football Attribute Validations (0 to 99)
      default: {
          const standardAttributes = [
              "overall_rating", "potential", "long_shots", "crossing", "finishing",
              "heading_accuracy", "short_passing", "volleys", "dribbling", "curve",
              "freekick_accuracy", "long_passing", "ball_control", "acceleration",
              "sprint_speed", "agility", "reactions", "balance", "shot_power",
              "jumping", "stamina", "strength", "aggression", "interceptions",
              "positioning", "vision", "penalties", "composure", "marking",
              "standing_tackle", "sliding_tackle"
          ];

          if (standardAttributes.includes(name)) {
              if (value === undefined || value < 0 || value > 99) {
                  error[name] = `${name.replace("_", " ")} must be between 0 and 99.`;
              }
          }
          break;
      }
  }

  return error;
};

export  { validateEmail, validatePassword, validateUsername,validatePlayerInput};
