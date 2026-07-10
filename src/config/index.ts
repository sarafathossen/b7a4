import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET || 'my_super_secret_key_12345_gearup',
  stripe_secret_key: process.env.STRIPE_SECRET_KEY || '',
};