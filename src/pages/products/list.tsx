import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonSearchbar,
  useIonAlert,
  useIonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { trashBinOutline } from 'ionicons/icons';
const ProductList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/category-list');
        setCategories(['all', ...response.data]); // Add "all" as the default tab
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (selectedCategory === 'all') {
          const response = await axios.get('https://dummyjson.com/products');
          setProducts(response.data.products);
        } else {
          const response = await axios.get(`https://dummyjson.com/products/category/${selectedCategory}`);
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);
  const clearList = () => {
    showAlert({
      header: 'Confirm!',
      message: 'Are you sure you want to delete all users?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            setUsers([]);
            showToast({
              message: 'All users deleted',
              duration: 2000,
              color: 'danger',
            });
          },
        },
      ],
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'secondary'}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Danh sách sản phẩm</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon slot="icon-only" icon={trashBinOutline} color={'light'} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color={'secondary'}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Tabs */}
        <IonSegment
          value={selectedCategory}
          onIonChange={(e) => {
            const category: any = e.detail.value || 'all';
            setSelectedCategory(category);
          }}
          className="ion-segment-scroll" // Add this class
        >
          {categories.map((category) => (
            <IonSegmentButton value={category} key={category} className="segment-button">
              <IonLabel style={{ fontSize: '8px' }}>{category === 'all' ? 'Tất cả' : category}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <IonSpinner name="crescent" />
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          // Product List
          <IonGrid>
            <IonRow>
              {products.map((product) => (
                <IonCol size="6" key={product.id}>
                  <IonCard
                    button
                    onClick={() => history.push(`/product/${product.id}`)}
                  >
                    <IonImg src={product.thumbnail} alt={`Thumbnail for ${product.title}`} />
                    <IonCardHeader>
                      <IonCardTitle>{product.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{product.description.substring(0, 50)}...</p>
                      <p>
                        <strong>Giá:</strong> ${product.price}
                      </p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductList;
