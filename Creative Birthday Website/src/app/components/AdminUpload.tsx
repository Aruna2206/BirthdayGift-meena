import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Files } from 'lucide-react';
import { uploadImage, bulkUploadImages } from '../../services/api';

interface AdminUploadProps {
  token: string;
  onLogout: () => void;
}

export function AdminUpload({ token, onLogout }: AdminUploadProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState('gallery');
  const [category, setCategory] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;
    if (files.length === 1 && !title) return;

    setStatus('uploading');
    setErrorMessage('');

    try {
      if (files.length > 1) {
        // Bulk Upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('page', page);
        if (category) formData.append('category', category);
        formData.append('is_favorite', String(isFavorite));
        formData.append('is_special', String(isSpecial));
        
        files.forEach(file => {
          formData.append('files', file);
        });
        await bulkUploadImages(formData, token);
      } else {
        // Single Upload
        const formData = new FormData();
        formData.append('title', title);
        if (description) formData.append('description', description);
        formData.append('page', page);
        if (category) formData.append('category', category);
        formData.append('is_favorite', String(isFavorite));
        formData.append('is_special', String(isSpecial));
        formData.append('file', files[0]);
        await uploadImage(formData, token);
      }

      setStatus('success');
      setTitle('');
      setDescription('');
      setCategory('');
      setIsFavorite(false);
      setIsSpecial(false);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') {
        onLogout();
        return;
      }
      setStatus('error');
      setErrorMessage(`Failed to upload. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-pink-500/5 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-500">Admin Upload</h1>
          <button onClick={onLogout} className="text-pink-500 hover:text-pink-500 font-semibold">Logout</button>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {files.length > 1 ? 'Common Title' : 'Image Title *'}
              </label>
              <input 
                type="text" 
                required={files.length === 1}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Memory name"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[80px]" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Special Category</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
              >
                <option value="">No Category</option>
                <option value="Gifted from Him">Gifted from Him 🎁</option>
                <option value="Make my day">Make my day ✨</option>
                <option value="Good Memories of my life">Good Memories of my life 🌟</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Page</label>
              <select 
                value={page}
                onChange={e => setPage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
              >
                <option value="gallery">Gallery Page</option>
                <option value="home">Home Page</option>
                <option value="timeline">Timeline Page</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={isFavorite}
                onChange={e => setIsFavorite(e.target.checked)}
                className="w-5 h-5 accent-pink-500 rounded-md"
              />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-500 transition-colors">Mark as Favorite ❤️</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={isSpecial}
                onChange={e => setIsSpecial(e.target.checked)}
                className="w-5 h-5 accent-rose-500 rounded-md"
              />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-500 transition-colors">Mark as Special ⭐</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image Files *</label>
            <div className="border-2 border-dashed border-pink-500 rounded-xl p-6 flex flex-col items-center justify-center bg-pink-50/50 hover:bg-pink-500/5 transition-colors">
              <input 
                type="file" ref={fileInputRef} required multiple accept="image/*"
                onChange={e => setFiles(Array.from(e.target.files || []))}
                className="hidden" id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center w-full text-center">
                <Files className="w-12 h-12 text-pink-500 mb-2" />
                <span className="text-pink-500 font-medium">
                  {files.length > 0 ? `${files.length} files selected` : 'Select photos'}
                </span>
              </label>
            </div>
          </div>

          {status === 'success' && (
             <div className="text-green-600 bg-green-50 p-3 rounded-lg flex items-center gap-2">
               <CheckCircle size={20} /> <span>Upload Complete!</span>
             </div>
          )}

          <button
            type="submit"
            disabled={status === 'uploading' || files.length === 0 || (files.length === 1 && !title)}
            className="w-full bg-pink-500/50 text-white font-bold py-4 rounded-xl hover:bg-pink-500 shadow-lg disabled:opacity-50"
          >
            {status === 'uploading' ? 'Uploading...' : 'Upload Now'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
