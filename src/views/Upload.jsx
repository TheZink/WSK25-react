import { useFile, useMedia } from "../hooks/apiHooks.js";
import { useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../hooks/formHooks";

const Upload = () => {
  const [file, setFile] = useState(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {

    try {

      console.log('File before upload', file);
      const token = window.localStorage.getItem('token');
      console.log('postFile function:', postFile)
      console.log('Token berofe postFile:', token)
      const fileResult = await postFile(file, token);
      console.log('fileresult', fileResult);

      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('mediaresult', mediaResult);

      navigate('/')

    } catch (error) {
      console.log('error',error.message);
    }
  };

  const { inputs,  handleSubmit, handleInputChange } = useForm(doUpload);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log('Selected file: ', evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

    return (
        <>
            <h1>Upload</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows={5}
                        id="description"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="file">File</label>
                    <input
                        name="file"
                        type="file"
                        id="file"
                        accept="image/*, video/*"
                    onChange={handleFileChange}
                    />
                </div>
                <img
                    src={
                        file
                        ? URL.createObjectURL(file)
                        : 'https://placehold.co/600x400?text=Choose+image'
                    }
                    alt="preview"
                    width="200"
                />
                <button
                    type="submit"
                    disabled={!(file && inputs?.title.length > 3)}
                >
                    Upload
                </button>
            </form>
        </>
    );
};

export default Upload
