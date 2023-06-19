import React, { useState, useEffect } from 'react';
import Layout from '@components/layout/index';
import Container from '@components/ui/container';
import Loader from '@components/ui/loader/loader';
// import { Image } from '@components/ui/image';

function photos() {
  const [photos, setPhotos] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/get-photos`
      );
      const data = await res.json();
      console.log(data.photos);
      setPhotos(data.photos);
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  return (
    <Container>
      <h1 className="bg-violet-500 hover:bg-violet-600">Minio KYC Bucket Images:</h1>
      {loading ? (
        <Loader />
      ) : (
        photos && (
          <div className="grid grid-cols-4 gap-4">
            {photos.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <img className="object-cover h-48 w-62" src={item} alt={`photo-${idx}`} />
              </div>
            ))}
          </div>
        )
      )}
    </Container>
  );
}

photos.Layout = Layout;

export default photos;
