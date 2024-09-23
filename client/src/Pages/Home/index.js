import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";

import homeBannerPlaceholder from "../../assets/images/homeBannerPlaceholder.jpg";
import Banners from "../../Components/banners";
import Product_Slider from "../../Components/Product_Slider";

import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const styles = {
  productRow: {
    position: 'relative',
    height: '500px', // Adjust this value based on your product item height
    width: '100%',
    marginTop: '1rem',
  },
  swiper: {
    width: '100%',
    height: '100%',
  },
  swiperSlide: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '300px', // Adjust based on your product item width
    height: '400px', // Adjust based on your product item height
  },
  productItem: {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
  },

  
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCat, setselectedCat] = useState();
  const [filterData, setFilterData] = useState([]);
  const [homeSlides, setHomeSlides] = useState([]);

  const [value, setValue] = React.useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectCat = (cat) => {
    setselectedCat(cat);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setisHeaderFooterShow(true);
    setselectedCat(context.categoryData[0]?.name);

    const location = localStorage.getItem("location");

    if (location !== null && location !== "" && location !== undefined) {
      fetchDataFromApi(`/api/products/featured?location=${location}`).then(
        (res) => {
          setFeaturedProducts(res);
        }
      );

      fetchDataFromApi(
        `/api/products?page=1&perPage=12&location=${location}`
      ).then((res) => {
        setProductsData(res);
      });
    }

    fetchDataFromApi("/api/homeBanner").then((res) => {
      setHomeSlides(res);
    });


  }, []);

  useEffect(() => {
    if (context.categoryData[0] !== undefined)
      setselectedCat(context.categoryData[0].name);
  }, [context.categoryData]);

  useEffect(() => {
    if (selectedCat !== undefined) {
      setIsLoading(true);
      const location = localStorage.getItem("location");
      fetchDataFromApi(
        `/api/products/catName?catName=${selectedCat}&location=${location}`
      ).then((res) => {
        setFilterData(res.products);
        setIsLoading(false);
        // console.log(selectedCat)
      });
    }
  }, [selectedCat]);

  return (
    <>
      {homeSlides?.length !== 0 ? (
        <HomeBanner data={homeSlides} />
      ) : (
        <div className="container">
          <div className="homeBannerSection">
            <img src={homeBannerPlaceholder} className="w-100" />
          </div>
        </div>
      )}

      {context.categoryData?.length !== 0 && (
        <HomeCat catData={context.categoryData} />
      )}








      <section className="homeProducts">
        <div className="container">
          <div className="row homeProductsRow">


            <div className="col-md-12 productRow">
              {/* NEW PRODUCTS */}

              <div className="d-flex align-items-center justify-content-center  mt-5 mb-5">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd text-center">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0 text-center">
                    New products with updated stocks.
                  </p>
                </div>
              </div>

              {productsData?.products?.length === 0 && (
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                  <CircularProgress />
                </div>
              )}



              {/* 3d slider start */}
              <div style={styles.productRow}>
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                  autoplay={{
                    delay: 3000, // Delay between transitions (in ms)
                    disableOnInteraction: false, // Continue autoplay after user interaction

                  }}
                  loop={true} // Enable infinite loop
                  style={styles.swiper}
                >
                  {productsData?.products?.length !== 0 &&
                    productsData?.products
                      ?.slice(0)
                      .reverse()
                      .map((item, index) => (
                        <SwiperSlide key={index} style={styles.swiperSlide}>
                          <div style={styles.productItem}>
                            <ProductItem item={item} />
                          </div>
                        </SwiperSlide>
                      ))}
                </Swiper>
              </div>

              {/* 3 d slider end */}


              {/* <div className="product_row productRow2 w-100 mt-4 d-flex productScroller">
                {productsData?.products?.length !== 0 &&
                  productsData?.products
                    ?.slice(0)
                    .reverse()
                    .map((item, index) => {
                      return <ProductItem key={index} item={item} />;
                    })}
              </div> */}


              <div  className="d-flex align-items-center justify-content-center mt-4">
                <div className="info">
                  <h3 className="mb-0 hd text-center">featured products</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
              </div>


              {featuredProducts?.length === 0 && (
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                  <CircularProgress />
                </div>
              )}

              <div className="product_row w-100 mt-5 mb-5">
                {context.windowWidth > 992 ? (
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={0}
                    navigation={true}
                    slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                      300: {
                        slidesPerView: 1,
                        spaceBetween: 5,
                      },
                      400: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                      },
                      600: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                      },
                      750: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                      },
                    }}
                  >
                    {featuredProducts?.length !== 0 &&
                      featuredProducts
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <ProductItem item={item} />
                            </SwiperSlide>
                          );
                        })}

                    <SwiperSlide style={{ opacity: 0 }}>
                      <div className={`productItem`}></div>
                    </SwiperSlide>
                  </Swiper>
                ) : (
                  <div className="productScroller">
                    {featuredProducts?.length !== 0 &&
                      featuredProducts
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => {
                          return <ProductItem item={item} key={index} />;
                        })}
                  </div>
                )}
              </div>
              {/* feature end */}

              {/* popular start */}
              <div  className="d-flex align-items-center res-flex-column mt-5 mb-5">
                <div className="info" style={{ width: "35%" }}>
                  <h3 className="mb-0 hd">Popular Products</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>

                <div
                  className="ml-auto d-flex align-items-center justify-content-end res-full"
                  style={{ width: "65%" }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    className="filterTabs"
                  >
                    {context.categoryData?.map((item, index) => {
                      return (
                        <Tab
                          className="item"
                          label={item.name}
                          onClick={() => selectCat(item.name)}
                        />
                      );
                    })}
                  </Tabs>
                </div>
              </div>

              <div
                className="product_row w-100 mt-2"
                style={{
                  opacity: `${isLoading === true ? "0.5" : "1"}`
                }}
              >
                {filterData?.length === 0 && (
                  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                    <CircularProgress />
                  </div>
                )}

                {context.windowWidth > 992 ? (
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={0}
                    navigation={true}
                    slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                    modules={[Navigation]}
                    className="mySwiper"
                  >

                    {filterData?.length !== 0 &&
                      filterData
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <ProductItem item={item} />
                            </SwiperSlide>
                          );
                        })}

                    <SwiperSlide style={{ opacity: 0 }}>
                      <div className={`productItem`}></div>
                    </SwiperSlide>
                  </Swiper>
                ) : (
                  <div className="productScroller">
                    {filterData?.length !== 0 &&
                      filterData
                        ?.slice(0)
                        ?.reverse()
                        ?.map((item, index) => {
                          return <ProductItem item={item} key={index} />;
                        })}
                  </div>
                )}
              </div>




            </div>
          </div>
        </div>

        {/* <Product_Slider /> */}

        {/* 3D Swipper */}


      </section>
    </>
  );
};

export default Home;
