import { useEffect, useRef } from "react";
import { Input } from "../input";
import { Label } from "../label";
import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../button";
import axios from "axios";
import { Skeleton } from "../skeleton";

const ImageUpload = ({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoading,
  setImageLoading,
}) => {
  const inputRef = useRef();

  const handleImageFile = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoading(true);
    const data = new FormData();
    data.append("my_file", file);
    const response = await axios.post(
      "http://localhost:4000/api/admin/products/upload-image",
      data
    );

    if (response.data.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (file !== null) {
      uploadImageToCloudinary();
    }
  }, [file]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-sm">Upload Product Image</Label>

      <div
        className="border-2 border-dashed rounded-lg p-4 mt-1"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          ref={inputRef}
          onChange={handleImageFile}
          id="image-upload"
          type="file"
          className="hidden"
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className={"h-10 bg-gray-400"} />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-7 h-7 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
