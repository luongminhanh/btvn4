import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { DotLoader } from 'react-spinners';

function Photos() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(2);

    const getMorePhotos = async () => {
        try {
            const photos = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=8`);
            return photos.data;
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleLoadMorePhotos = async () => {
        const photos = await getMorePhotos(page);
        console.log(photos);
        const newPhotos = [...images, ...photos];
        setImages(newPhotos);
        setPage(page + 1);
    }

    useEffect(() => {
        handleLoadMorePhotos();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='bg-black'>
            <div className='list-images grid grid-cols-4 gap-3 w-[100%] pt-10'>
                {images.length ?
                    images.map((image) => {
                        return <div key={image.id} >
                            <img className='m-auto mb-7 w-[85%] h-[200px] rounded-lg  drop-shadow-lg object-cover p-3 bg-white' src={image.download_url} alt={image.author} />
                        </div>
                    })
                    :
                    <DotLoader className='loading ml-[200%] p-5 m-28' color={'#9333ea'} size={80} />
                }
            </div>
            <div className='text-center'>
                <button onClick={handleLoadMorePhotos} className='text-white mt-10 drop-shadow-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-7 py-3 mr-2 mb-2'>Load More</button>
            </div>
        </div>
    );
}

export default Photos