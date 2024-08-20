export const signup = async (req, res) => {
    try {
      const { email } = req.body;
      console.log('email : ', email);
      return res.status(200).json({
        success: true,
        message: 'User created successfully',
      });
    } catch (error) {
      console.log('Signup error:', error);
      return res.status(401).json({
        success: false,
        message: 'Something went wrong during signup',
      });
    }
  };