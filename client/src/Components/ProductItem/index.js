import Rating from '@mui/material/Rating';
import { TfiFullscreen } from "react-icons/tfi";
import Button from '@mui/material/Button';
import { IoMdHeartEmpty } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import Skeleton from '@mui/material/Skeleton';
import { IoIosImages } from "react-icons/io";
import { fetchDataFromApi, postData } from '../../utils/api';
import { FaHeart } from "react-icons/fa";


const ProductItem = (props) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddedToMyList, setSsAddedToMyList] = useState(false);
    const [isAbove600, setIsAbove600] = useState(window.innerWidth > 600);
    const context = useContext(MyContext);

    const sliderRef = useRef();

    var settings = {
        dots: true,
        infinite: true,
        loop: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: 100
    };

    useEffect(() => {
        const handleResize = () => {
            setIsAbove600(window.innerWidth > 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const viewProductDetails = (id) => {
        context.openProductDetailsModal(id, true);
    }

    const handleMouseEnter = (id) => {
        if (isLoading === false) {
            setIsHovered(true);
            setTimeout(() => {
                if (sliderRef.current) {
                    sliderRef.current.slickPlay();
                }
            }, 20);
        }

        const user = JSON.parse(localStorage.getItem("user"));

        fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
                setSsAddedToMyList(true);
            }
        })

    }


    const handleMouseLeave = () => {
        if (isLoading === false) {
            setIsHovered(false);
            setTimeout(() => {
                if (sliderRef.current) {
                    sliderRef.current.slickPause();
                }
            }, 20);
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            console.log(`originalFilename Name: ${props.item?.images[0].split('/').pop()}`);
        }, 500);
    }, []);
    useEffect(() => {
       
            console.log(`originalFilename Name: ${props.item?.images[0].split('/').pop()}`);
     
    }, []);

    const addToMyList = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null && user !== "") {
            const data = {
                productTitle: props?.item?.name,
                image: props.item?.images[0],
                rating: props?.item?.rating,
                price: props?.item?.price,
                productId: id,
                userId: user?.userId
            }
            postData(`/api/my-list/add/`, data).then((res) => {
                if (res.status !== false) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "the product added in my list"
                    })



                    fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
                        if (res.length !== 0) {
                            setSsAddedToMyList(true);
                        }
                    })


                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                }

            })
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please Login to continue"
            })
        }

    }
    
    const handleClick = () => {
     
        const catName = props.item?.catName?.toLowerCase(); // Convert category name to lowercase
    
        // Get the original filename
        const originalFilename = props.item?.images[0].split('/').pop();
    
        // Remove everything before the underscore
        const filename = originalFilename.split('_').slice(1).join('_').replace(/\.jpg$/, '.png');
    
        const url = `https://91.132.134.185:8080/${catName}/${filename}`;

      
        console.log(`Image URL: ${url}`);
        window.location.href = url;
    };
    
    
    
    
    return (
        <>
            <div className={`productItem ${props.itemView}`}
                onMouseEnter={() => handleMouseEnter(props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id)}
                onMouseLeave={handleMouseLeave}
            >

                <div className="img_rapper">
                    <Link to={`/product/${props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id}`}>
                        <div className='productItemSliderWrapper'>
                            {
                                isHovered === true &&
                                <Slider {...settings} ref={sliderRef} className='productItemSlider'>
                                    {
                                        props.item?.images?.map((image, index) => {
                                            return (
                                                <div className='slick-slide' key={index}>
                                                    <img src={image} className="w-100" />
                                                </div>
                                            )
                                        })
                                    }

                                </Slider>
                            }

                        </div>

                        {
                            isLoading === true ?
                                <Skeleton variant="rectangular" width={300} height={400}>
                                    <IoIosImages />
                                </Skeleton>

                                :

                                <img src={props.item?.images[0]} className="w-100" />
                        }




                    </Link>

                    <span className="badge badge-primary">{props.item?.discount}%</span>
                    <div className="actions">
                        <Button onClick={() => viewProductDetails(props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id)}><TfiFullscreen /></Button>

                        <Button className={isAddedToMyList === true && 'active'} onClick={() => addToMyList(props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id)}>
                            {
                                isAddedToMyList === true ? <FaHeart style={{ fontSize: '20px' }} />
                                    :
                                    <IoMdHeartEmpty style={{ fontSize: '20px' }} />
                            }

                        </Button>
                    </div>
                </div>

                <div className="info">
                    <Link to={`/product/${props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id}`}><h4>{props?.item?.name?.substr(0, 30) + '...'}</h4></Link>

                    {
                        props?.item?.countInStock >= 1 ? <span className="text-success d-block">In Stock    <span className="netPrice text-danger ml-2 below">
                              <Button onClick={handleClick} style={{ marginTop: -7, marginLeft: '0%', backgroundColor: '#f1e7e8', color: 'black'}} >Try-on</Button>
                              </span></span>
                            :
                            <span className="text-danger d-block">Out of Stock</span>
                    }

                    <Rating className="mt-2 mb-2" name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />
                    <div className="d-flex ">
                        <span className="oldPrice">Rs {props?.item?.oldPrice}</span>
                        <span className="netPrice text-danger ml-2">Rs {props?.item?.price}</span>
                        <span className="netPrice text-danger ml-2 above">  <Button onClick={handleClick} style={{ marginTop: -7,backgroundColor: '#f1e7e8', color: 'black'}} >Try-on</Button></span>
                    </div>
                </div>
            </div>


            {/*<ProductModal/> */}
        </>
    )
}

export default ProductItem