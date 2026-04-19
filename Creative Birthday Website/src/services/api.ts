import { API_BASE_URL } from './config';

export interface Photo {
  id: string; // Changed to string for MongoDB ObjectId
  title: string;
  description: string | null;
  url: string;
  page: string;
  category?: string;
  is_favorite?: boolean;
  is_special?: boolean;
}



export const fetchImagesByPage = async (page: string): Promise<Photo[]> => {
  const response = await fetch(`${API_BASE_URL}/images/${page}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch images for page: ${page}`);
  }
  return response.json();
};

export const fetchImagesByCategory = async (category: string): Promise<Photo[]> => {
  const response = await fetch(`${API_BASE_URL}/images/filter/category/${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch images for category: ${category}`);
  }
  return response.json();
};

export const fetchSpecialMemories = async (): Promise<Photo[]> => {
  const response = await fetch(`${API_BASE_URL}/images/special`);
  if (!response.ok) {
    throw new Error("Failed to fetch special memories");
  }
  return response.json();
};

export const fetchFavorites = async (): Promise<Photo[]> => {
  const response = await fetch(`${API_BASE_URL}/images/favorites`);
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
};

export const fetchAllPhotos = async (params: {category?: string, is_favorite?: boolean, is_special?: boolean} = {}): Promise<Photo[]> => {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.is_favorite !== undefined) query.append('is_favorite', String(params.is_favorite));
  if (params.is_special !== undefined) query.append('is_special', String(params.is_special));
  
  const response = await fetch(`${API_BASE_URL}/images/?${query.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch filtered photos");
  }
  return response.json();
};

export const uploadImage = async (formData: FormData, token: string) => {
  const response = await fetch(`${API_BASE_URL}/images/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Upload failed');
  }

  return response.json();
};
 
export const bulkUploadImages = async (formData: FormData, token: string) => {
  const response = await fetch(`${API_BASE_URL}/bulk-images/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Bulk upload failed');
  }

  return response.json();
};
