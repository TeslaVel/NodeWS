import User from '../models/User';
import Comment from '../models/Comment';
import Business from '../models/Business';

Business.associate_to_many(User, 'business_id')

User.associate_to_many(Comment, 'user_id')
User.associate_belong_to(Business, 'business_id')

Comment.associate_belong_to(User, 'user_id')