const API_URL = 'http://localhost:3000';

export const fetchAllWorks = async () => {
  const response = await fetch(`${API_URL}/works`);
  if (!response.ok) {
    throw new Error('Failed to fetch works');
  }
  return await response.json();
};

export const fetchUserWorks = async (id) => {
  const response = await fetch(`${API_URL}/works/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch work');
  }
  return await response.json();
};

export const createWork = async (cardData) => {
  const response = await fetch(`${API_URL}/works`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.json();
};

export const updateWork = async (_id, work) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_URL}/works/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(work),
  });
  if (!response.ok) {
    throw new Error('Failed to update work');
  }
  return response.json();
};


export const deleteWork = async (_id) => {
  if (!_id) {
    throw new Error('Invalid ID');
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_URL}/works/${_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete work');
  }
};
