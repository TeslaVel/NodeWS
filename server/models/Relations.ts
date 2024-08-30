import User from '../models/User';
import Comment from '../models/Comment';
import Business from '../models/Business';
import Post from '../models/Post';

Business.associate_to_many(User, 'business_id')

User.associate_to_many(Comment, 'user_id')
User.associate_to_many(Post, 'user_id')
User.associate_belong_to(Business, 'business_id')

Comment.associate_belong_to(User, 'user_id')
Comment.associate_belong_to(Post, 'post_id')

Post.associate_to_many(Comment, 'post_id')
Post.associate_belong_to(User, 'user_id')