import React, { useState } from "react";
import axois from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export default function Upload() {
	// Crop image state
	const [upImg, setUpImg] = useState();
	const [image, setImage] = useState(null);
	const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
	const [result, setResult] = useState(null);
	// Input handler
	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
	};
	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener("load", () => setUpImg(reader.result));
	};
	//
	// axios
	const options = {
		onUploadProgress: (ProgressEvent) => {
			const { loaded, total } = ProgressEvent;
			let precent = Math.floor((loaded * 100) / total);
			console.log(`${loaded}kb of ${total}kb | ${precent}% `);
		},
	};
	const uploadImage = async (e) => {
		e.preventDefault();
		// const files = e.target.files[0];
		// setImage(files);
		const data = new FormData();
		data.append("upload_preset", "UploadImage");
		data.append("file", result);

		axois
			.post(
				"https://api.cloudinary.com/v1_1/eslamhesham/image/upload",
				data,
				options
			)
			.then((res) => setUpImg(res.data.secure_url))
			.catch((err) => console.log(err));
	};
	function getCroppedImg() {
		const canvas = document.createElement("canvas");
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext("2d");

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);
		const base64Image = canvas.toDataURL("image/jpeg");
		setResult(base64Image);
	}
	return (
		<div className="upload-container">
			<h1>Crop & Download an Image</h1>
			<form className="form" onSubmit={uploadImage}>
				<input
					id="fileInput"
					type="file"
					name="image"
					onChange={handleFileInputChange}
				/>
				<button type="button" onClick={getCroppedImg}>
					Crop
				</button>
				<button type="submit">upload</button>
				<div className="crop-container">
					<ReactCrop
						src={upImg}
						onImageLoaded={setImage}
						crop={crop}
						onChange={(c) => setCrop(c)}
					/>
				</div>
				{result && (
					<div>
						<img src={result} alt="cropped" />
					</div>
				)}
			</form>
		</div>
	);
}
