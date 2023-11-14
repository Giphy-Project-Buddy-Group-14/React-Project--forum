import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';

import fileUploadImage from '@/assets/file-upload.svg';

const convertFileToUrl = (file) => URL.createObjectURL(file);

export default function FileUploader({ setImages, mediaUrl }) {

    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles);
        setImages(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]));
    }, [file]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });


    return (
        <div
            {...getRootProps()}
            className="col-span-full bg-white bg-opacity-90 backdrop-blur-sm flex flex-center flex-col rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
            <input {...getInputProps()} className="sr-only" />

            {fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="image" className="file_uploader-img" />
                    </div>
                    <p className="text-sm leading-6 text-gray-600 hover:text-blue-300 cursor-pointer">Click or drag photo to replace</p>
                </>
            ) : (
                <div className="text-center">
                    <img
                        src={fileUploadImage}
                        width={96}
                        height={77}
                        alt="file upload"
                        className="mx-auto h-12 w-12 text-gray-300"
                    />

                    <h3 className="base-medium text-gray-600 mb-2 mt-6">
                        Drag photo here
                    </h3>
                    <p className="text-xs leading-5 text-gray-600">
                        SVG, PNG, JPG
                    </p>

                    <button type="button" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        Select from computer
                    </button>
                </div>
            )}
        </div>
    )



}
