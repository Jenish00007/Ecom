import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide_image_1 from '../../assets/images/img_1.jpg';
import slide_image_2 from '../../assets/images/img_2.jpg';
import slide_image_3 from '../../assets/images/img_3.jpg';
import slide_image_4 from '../../assets/images/img_4.jpg';
import slide_image_5 from '../../assets/images/img_5.jpg';
import slide_image_6 from '../../assets/images/img_6.jpg';
import slide_image_7 from '../../assets/images/img_7.jpg';
const styles = {
  container: {
    maxWidth: '124rem',
    padding: '4rem 1rem',
    margin: '0 auto',
  },
  heading: {
    padding: '1rem 0',
    fontSize: '3.5rem',
    textAlign: 'center',
  },
  swiperContainer: {
    height: '52rem',
    padding: '2rem 0',
    position: 'relative',
  },
  swiperSlide: {
    width: '37rem',
    height: '42rem',
    position: 'relative',
  },
  slideImage: {
    width: '37rem',
    height: '42rem',
    borderRadius: '2rem',
    objectFit: 'cover',
  },
  sliderController: {
    position: 'relative',
    bottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderArrow: {
    background: '#ffffff',
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1))',
  },
  pagination: {
    position: 'relative',
    width: '15rem',
    bottom: '1rem',
  },
  paginationBullet: {
    filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1))',
  },
  paginationActive: {
    background: '#6a59ff',
  },
};
function Product_Slider() {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Flower Gallery</h1>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          style={styles.swiperContainer}
        >
          {[slide_image_1, slide_image_2, slide_image_3, slide_image_4, slide_image_5, slide_image_6, slide_image_7].map((image, index) => (
            <SwiperSlide key={index} style={styles.swiperSlide}>
              <img src={image} alt={`slide_image_${index + 1}`} style={styles.slideImage} />
            </SwiperSlide>
          ))}
  
          <div style={styles.sliderController}>
            <div className="swiper-button-prev slider-arrow" style={styles.sliderArrow}>
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow" style={styles.sliderArrow}>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination" style={styles.pagination}></div>
          </div>
        </Swiper>
      </div>
    );
  }
  
export default Product_Slider;
