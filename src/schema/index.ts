import mongoose from 'mongoose';

import { postSchema, tagSubSchema } from './post.model';
import { userSchema } from './user.model';
import { commentSchema } from './comment.model';
import { categorySchema } from './category.model';

// 모델 정의
// 실제 저장될 컬렉션 이름은 'posts'가 됩니다.
const Post = mongoose.model('Post', postSchema);
const Tag = mongoose.model('Tag', tagSubSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Category = mongoose.model('Category', categorySchema); 

// 스키마 외부에 User, Category, Comment 모델을 정의하는 것이 일반적입니다.
// 이렇게 하면 각 모델을 별도로 관리하고 .populate() 시에 사용하기 편리합니다.
export { Post, Tag, User, Comment, Category }; 
