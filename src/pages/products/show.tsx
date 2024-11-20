import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSpinner,
  IonImg,
  IonButtons,
  IonMenuButton,
  IonBackButton,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'secondary'}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/products" />
          </IonButtons>
          <IonTitle>Product Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <IonSpinner name="crescent" />
            <p>Loading...</p>
          </div>
        ) : (
          product && (
            <div style={{ padding: '16px' }}>
              <IonImg src={product.thumbnail} alt={`Image of ${product.title}`} />
              <h1>{product.title}</h1>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Descriptions:</strong> {product.description}</p>
            </div>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default PostDetail;
