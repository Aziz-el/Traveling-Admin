// import { useState, useEffect } from 'react';
// import { Star, ThumbsUp, MessageSquare, Filter, Search, Plus, Trash2, Edit } from 'lucide-react';
// import Tour from '../shared/lib/data/fakeData.json';
// import { CustomSelect } from '../shared/ui/select';

// interface Review {
//   id: string;
//   tourId: string;
//   tourName: string;
//   userName: string;
//   userAvatar: string;
//   rating: number;
//   comment: string;
//   date: string;
//   likes: number;
//   status: 'Опубликован' | 'На модерации' | 'Отклонен';
//   ownerId?: string;
// }

// interface ReviewsProps {
//   tours: typeof Tour[];
// }

// export default function Reviews({ tours }: ReviewsProps) {
//   const STORAGE_KEY = 'reviews';

//   const readInitialReviews = (): Review[] => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) return JSON.parse(raw) as Review[];
//     } catch {}

//     return [
//       {
//         id: '1',
//         tourId: '1',
//         tourName: 'Токио - Киото: Императорская Япония',
//         userName: 'Анна Петрова',
//         userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
//         rating: 5,
//         comment: 'Невероятное путешествие! Особенно впечатлили древние храмы Киото и ночной Токио. Гид был очень профессиональным.',
//         date: '2024-12-08',
//         likes: 24,
//         status: 'Опубликован',
//       },
//       {
//         id: '2',
//         tourId: '2',
//         tourName: 'Магия Парижа: Эйфелева башня и Лувр',
//         userName: 'Дмитрий Соколов',
//         userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
//         rating: 4,
//         comment: 'Париж превзошел все ожидания! Единственный минус - слишком много туристов в Лувре.',
//         date: '2024-12-07',
//         likes: 18,
//         status: 'Опубликован',
//       },
//       {
//         id: '3',
//         tourId: '3',
//         tourName: 'Нью-Йорк: Город мечты',
//         userName: 'Елена Михайлова',
//         userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
//         rating: 5,
//         comment: 'Нью-Йорк - это что-то невероятное! Каждый день был наполнен новыми впечатлениями. Обязательно вернусь еще!',
//         date: '2024-12-06',
//         likes: 31,
//         status: 'Опубликован',
//       },
//       {
//         id: '4',
//         tourId: '5',
//         tourName: 'Большой Барьерный риф: Подводный рай',
//         userName: 'Иван Королев',
//         userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
//         rating: 5,
//         comment: 'Дайвинг на рифе - лучший опыт в моей жизни! Невероятная красота подводного мира.',
//         date: '2024-12-05',
//         likes: 27,
//         status: 'Опубликован',
//       },
//       {
//         id: '5',
//         tourId: '7',
//         tourName: 'Санторини: Белоснежная жемчужина',
//         userName: 'Мария Волкова',
//         userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
//         rating: 4,
//         comment: 'Романтичный остров с потрясающими закатами. Отель был отличным, но цены в ресторанах завышены.',
//         date: '2024-12-04',
//         likes: 15,
//         status: 'На модерации',
//       },
//     ];
//   };

//   const [reviews, setReviews] = useState<Review[]>(readInitialReviews);

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [filterRating, setFilterRating] = useState<number | null>(null);
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [editingReview, setEditingReview] = useState<Review | null>(null);

//   const [newReview, setNewReview] = useState({
//     tourId: '',
//     userName: '',
//     rating: 5,
//     comment: '',
//   });

//   const getUserId = () => {
//     try {
//       let id = localStorage.getItem('userId');
//       if (!id) {
//         id = `${Date.now()}-${Math.floor(Math.random()*10000)}`;
//         localStorage.setItem('userId', id);
//       }
//       return id;
//     } catch {
//       return 'unknown';
//     }
//   };

//   const userId = getUserId();

//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
//     } catch {}
//   }, [reviews]);

//   const filteredReviews = reviews.filter((review) => {
//     const matchesRating = filterRating ? review.rating === filterRating : true;
//     const matchesStatus = filterStatus === 'all' ? true : review.status === filterStatus;
//     const matchesSearch = review.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     review.comment.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesRating && matchesStatus && matchesSearch;
//   });

//   const handleAddReview = () => {
//     if (newReview.tourId && newReview.userName && newReview.comment) {
//       const tour = tours.find(t => t.id === newReview.tourId);
//       const review: Review = {
//         id: Date.now().toString(),
//         tourId: newReview.tourId,
//         tourName: tour?.name || '',
//         userName: newReview.userName,
//         userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
//         rating: newReview.rating,
//         comment: newReview.comment,
//         date: new Date().toISOString().split('T')[0],
//         likes: 0,
//         status: 'На модерации',
//         ownerId: userId,
//       };
//       setReviews([review, ...reviews]);
//       setNewReview({ tourId: '', userName: '', rating: 5, comment: '' });
//       setShowAddForm(false);
//     }
//   };

//   const handleUpdateReview = () => {
//     if (editingReview) {
//       setReviews(reviews.map(r => r.id === editingReview.id ? editingReview : r));
//       setEditingReview(null);
//     }
//   };

//   const handleDeleteReview = (id: string) => {
//     setReviews(reviews.filter(r => r.id !== id));
//   };

//   const handleLike = (id: string) => {
//     setReviews(reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
//   };

//   const handleStatusChange = (id: string, status: 'Опубликован' | 'На модерации' | 'Отклонен') => {
//     setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
//   };

//   const avgRating = reviews.length > 0 
//     ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
//     : 0;

//   const tourOptions = [
//     { value: '', label: 'Выберите тур' },
//     ...tours.map(tour => ({ value: tour.id, label: tour.name }))
//   ];

//   const ratingOptions = [
//     { value: '', label: 'Все рейтинги' },
//     { value: '5', label: '5 звезд' },
//     { value: '4', label: '4 звезды' },
//     { value: '3', label: '3 звезды' },
//     { value: '2', label: '2 звезды' },
//     { value: '1', label: '1 звезда' },
//   ];

//   const statusOptions = [
//     { value: 'all', label: 'Все статусы' },
//     { value: 'Опубликован', label: 'Опубликован' },
//     { value: 'На модерации', label: 'На модерации' },
//     { value: 'Отклонен', label: 'Отклонен' },
//   ];

//   const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-5 h-5 ${
//               star <= rating 
//                 ? 'fill-yellow-400 text-yellow-400' 
//                 : 'text-gray-300 dark:text-gray-600'
//             } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
//             onClick={() => interactive && onChange && onChange(star)}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="p-8 dark:bg-[#0a0a0f] min-h-screen">
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-2">
//           <h1 className="text-gray-900 dark:text-white">Отзывы</h1>
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             Добавить отзыв
//           </button>
//         </div>
//         <p className="text-gray-600 dark:text-gray-400">Управление отзывами клиентов</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50">
//           <div className="flex items-center gap-3 mb-2">
//             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//             <span className="text-gray-600 dark:text-gray-400">Средний рейтинг</span>
//           </div>
//           <p className="text-gray-900 dark:text-white">{avgRating} / 5.0</p>
//         </div>
//         <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50">
//           <div className="flex items-center gap-3 mb-2">
//             <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             <span className="text-gray-600 dark:text-gray-400">Всего отзывов</span>
//           </div>
//           <p className="text-gray-900 dark:text-white">{reviews.length}</p>
//         </div>
//         <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50">
//           <div className="flex items-center gap-3 mb-2">
//             <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
//             <span className="text-gray-600 dark:text-gray-400">Опубликовано</span>
//           </div>
//           <p className="text-gray-900 dark:text-white">
//             {reviews.filter(r => r.status === 'Опубликован').length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50">
//           <div className="flex items-center gap-3 mb-2">
//             <Filter className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//             <span className="text-gray-600 dark:text-gray-400">На модерации</span>
//           </div>
//           <p className="text-gray-900 dark:text-white">
//             {reviews.filter(r => r.status === 'На модерации').length}
//           </p>
//         </div>
//       </div>

//       {showAddForm && (
//         <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50 mb-8">
//           <h2 className="text-gray-900 dark:text-white mb-6">Новый отзыв</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-2">Тур</label>
//               <CustomSelect
//                 options={tourOptions}
//                 value={newReview.tourId}
//                 onChange={(value) => setNewReview({ ...newReview, tourId: value })}
//                 placeholder="Выберите тур"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-2">Имя пользователя</label>
//               <input
//                 type="text"
//                 value={newReview.userName}
//                 onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Введите имя"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-2">Рейтинг</label>
//               {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
//             </div>
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-2">Комментарий</label>
//               <textarea
//                 value={newReview.comment}
//                 onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//                 rows={4}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//                 placeholder="Напишите ваш отзыв..."
//               />
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleAddReview}
//                 className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//               >
//                 Добавить отзыв
//               </button>
//               <button
//                 onClick={() => setShowAddForm(false)}
//                 className="px-6 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
//               >
//                 Отмена
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">
//               <Search className="w-4 h-4 inline mr-2" />
//               Поиск
//             </label>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Поиск по турам, пользователям..."
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">
//               <Star className="w-4 h-4 inline mr-2" />
//               Рейтинг
//             </label>
//             <CustomSelect
//               options={ratingOptions}
//               value={filterRating?.toString() || ''}
//               onChange={(value) => setFilterRating(value ? Number(value) : null)}
//               placeholder="Все рейтинги"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">
//               <Filter className="w-4 h-4 inline mr-2" />
//               Статус
//             </label>
//             <CustomSelect
//               options={statusOptions}
//               value={filterStatus}
//               onChange={(value) => setFilterStatus(value)}
//               placeholder="Все статусы"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Reviews List */}
//       <div className="space-y-6">
//         {filteredReviews.map((review) => (
//           <div
//             key={review.id}
//             className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50 hover:shadow-lg transition-all duration-200"
//           >
//             {editingReview?.id === review.id ? (
//               // Edit Mode
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-2">Рейтинг</label>
//                   {renderStars(editingReview.rating, true, (rating) => 
//                     setEditingReview({ ...editingReview, rating })
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-2">Комментарий</label>
//                   <textarea
//                     value={editingReview.comment}
//                     onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
//                     rows={4}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-2">Статус</label>
//                   <select
//                     value={editingReview.status}
//                     onChange={(e) => setEditingReview({ 
//                       ...editingReview, 
//                       status: e.target.value as 'Опубликован' | 'На модерации' | 'Отклонен'
//                     })}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//                   >
//                     <option value="Опубликован">Опубликован</option>
//                     <option value="На модерации">На модерации</option>
//                     <option value="Отклонен">Отклонен</option>
//                   </select>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleUpdateReview}
//                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                   >
//                     Сохранить
//                   </button>
//                   <button
//                     onClick={() => setEditingReview(null)}
//                     className="px-6 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
//                   >
//                     Отмена
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               // View Mode
//               <>
//                 <div className="flex items-start gap-4 mb-4">
//                   <img
//                     src={review.userAvatar}
//                     alt={review.userName}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-2">
//                       <div>
//                         <h3 className="text-gray-900 dark:text-white">{review.userName}</h3>
//                         <p className="text-gray-600 dark:text-gray-400">{review.tourName}</p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`px-3 py-1 rounded-full ${
//                             review.status === 'Опубликован'
//                               ? 'bg-green-500/10 text-green-600 dark:text-green-400'
//                               : review.status === 'На модерации'
//                               ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
//                               : 'bg-red-500/10 text-red-600 dark:text-red-400'
//                           }`}
//                         >
//                           {review.status}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3 mb-3">
//                       {renderStars(review.rating)}
//                       <span className="text-gray-500 dark:text-gray-400">{review.date}</span>
//                     </div>
//                     <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={() => handleLike(review.id)}
//                         className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                       >
//                         <ThumbsUp className="w-4 h-4" />
//                         <span>{review.likes}</span>
//                       </button>
//                       {review.ownerId === userId && (
//                         <>
//                           <button
//                             onClick={() => setEditingReview(review)}
//                             className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                           >
//                             <Edit className="w-4 h-4" />
//                             Редактировать
//                           </button>
//                           <button
//                             onClick={() => handleDeleteReview(review.id)}
//                             className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Удалить
//                           </button>
//                         </>
//                       )}
//                       {review.status !== 'Опубликован' && (
//                         <button
//                           onClick={() => handleStatusChange(review.id, 'Опубликован')}
//                           className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
//                         >
//                           Опубликовать
//                         </button>
//                       )}
//                       {review.status !== 'Отклонен' && (
//                         <button
//                           onClick={() => handleStatusChange(review.id, 'Отклонен')}
//                           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
//                         >
//                           Отклонить
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}

//         {filteredReviews.length === 0 && (
//           <div className="bg-white dark:bg-[#13131a] rounded-xl p-12 border border-gray-200 dark:border-gray-800/50 text-center">
//             <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
//             <h3 className="text-gray-900 dark:text-white mb-2">Отзывы не найдены</h3>
//             <p className="text-gray-600 dark:text-gray-400">
//               Попробуйте изменить фильтры или добавьте новый отзыв
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }