import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { filesize } from "filesize";

// icons
// file
import { MdAttachFile } from "react-icons/md";
// send
import { GrSend } from "react-icons/gr";
// likes
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
// favorite
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
// comments
import { MdModeComment } from "react-icons/md";
import { MdOutlineModeComment } from "react-icons/md";
// more
import { RiMore2Fill } from "react-icons/ri";
// edit
import { CiEdit } from "react-icons/ci";
// share
import { CiShare2 } from "react-icons/ci";
// delete
import { RiDeleteBin6Line } from "react-icons/ri";
// warning
import { IoIosWarning } from "react-icons/io";
// remove
import { IoMdClose } from "react-icons/io";
// audio
import { MdAudiotrack } from "react-icons/md";
// video
import { PiVideoFill } from "react-icons/pi";
// file
import { MdFileCopy } from "react-icons/md";

// components
// timer
// loader
import Loading from "../../components/timer/Loading";
// user profile
import UserProfile from "../user/user-sub-pages/UserProfile";
// user name
import Username from "../user/user-sub-pages/Username";

// slices
// posts
import {
  postsSelector,
  addNewPost,
  deletePost,
  isPostDeletingSelector,
  isNewPostUploadingSelector,
  isPostLoadingSelector,
} from "../../features/posts/posts.slice";
// users
import { userSelector } from "../../features/users/users.slice";

const Home = () => {
  // states from slice
  // user
  const user = useSelector(userSelector);
  // posts
  const posts = useSelector(postsSelector);
  // is post loading
  const isPostLoading = useSelector(isPostLoadingSelector);
  // is new post uploading
  const isNewPostUploading = useSelector(isNewPostUploadingSelector);
  // is  post deleting
  const isPostDeleting = useSelector(isPostDeletingSelector);

  // local states
  const [text, setText] = useState("");
  // more option
  const [postMore, setPostMore] = useState({
    options: [
      {
        icon: CiShare2,
        text: "share",
      },
      {
        icon: MdFavoriteBorder,
        text: "favorite",
      },
      {
        icon: CiEdit,
        text: "edit",
      },
      {
        icon: RiDeleteBin6Line,
        text: "delete",
      },
    ],
    selectedId: null,
  });
  // delete post
  const [isDeletePost, setIsDeletePost] = useState(null);
  // files
  const [files, setFiles] = useState([]);
  // is deagging
  const [isFileDragging, setIsFileDragging] = useState(false);
  // description
  const [fileDescription, setFileDescription] = useState("");

  // dispatch
  const dispatch = useDispatch();

  // adjust textarea height
  const adjustPostTextAreaHeight = (e) => {
    let textarea = document.getElementById("post-text-input");
    textarea.style.height = "17px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
    if (!e.target.value) {
      textarea.style.height = "17px";
    }
  };

  // adjust textarea height
  const adjustFilesDescriptionTextAreaHeight = (e) => {
    let textarea = document.getElementById("files-description");
    textarea.style.height = "24px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
    if (!e.target.value) {
      textarea.style.height = "24px";
    }
  };

  // form submit handler
  const formSubmitHandler = () => {
    let textarea = document.getElementById("post-text-input");
    if (text?.trim()) {
      dispatch(addNewPost({ text }));
    }
    textarea.style.height = "17px";
    setText("");
  };

  // hide the pop up after deleting
  useEffect(() => {
    setIsDeletePost(null);
  }, [posts]);

  // files input change handler
  const filesInputChangeHandler = (e) => {
    setFiles([...e.target.files]);
  };

  // remove file
  const removeFile = (index) => {
    setFiles(files?.filter((fileItem, i) => i !== index));
  };

  // on drag over handler
  const onDragOverHandler = (e) => {
    e.preventDefault();
    setIsFileDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  // on drag leave handler
  const onDragLeavHandler = (e) => {
    e.preventDefault();
    setIsFileDragging(true);
  };

  // on drag drop handler
  const onDragDropHandler = (e) => {
    e.preventDefault();
    setIsFileDragging(false);
    setFiles([...e.dataTransfer.files]);
  };

  // new post with file handler
  const newPostWithFileHandler = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("text", fileDescription);
    dispatch(addNewPost(formData));
  };

  // use effect
  useEffect(() => {
    setFiles([]);
    setFileDescription("");
  }, [posts]);

  // file progile
  const fileProfile = (fileItem) => {
    console.log(fileItem.type,"+++")
    let type = fileItem.type.split("/")[0];
    let fileExtension = fileItem.name.split(".").reverse()[0];
    // console.log(fileItem.type.split("/")[0]);
    // console.log(fileItem.name.split(".").reverse()[0]);
    // console.log(URL.createObjectURL(fileItem));
    return (
      <div
        className={`w-[24px] aspect-square overflow-hidden rounded-full  text-white flex items-center justify-center text-xl ${
          type === "application" ? "bg-white" : "bg-green-600"
        }`}
      >
        {type === "image" ? (
          <img
            src={URL.createObjectURL(fileItem)}
            className="w-full h-full object-center object-cover"
            alt=""
          />
        ) : type === "audio" ? (
          <MdAudiotrack />
        ) : type === "video" ? (
          <PiVideoFill className="text-lg" />
        ) : type === "application" ? (
          <>
            <>
              {fileExtension === "pdf" ? (
                <img
                  src="https://static.vecteezy.com/system/resources/previews/023/234/824/original/pdf-icon-red-and-white-color-for-free-png.png"
                  alt=""
                />
              ) : fileExtension === "docx" ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Microsoft_Word_2013-2019_logo.svg/1200px-Microsoft_Word_2013-2019_logo.svg.png"
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ) : fileExtension === "zip" || fileExtension === "rar" ? (
                <img
                  src="https://vectorified.com/images/rar-icon-14.png"
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ) : fileExtension === "exe" ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/10511/10511412.png"
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ) : fileExtension === "apk" ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/10234/10234503.png"
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ): fileExtension === "ppt" ? (
                <img
                  src="https://cdn1.iconfinder.com/data/icons/application-file-formats/128/microsoft-powerpoint-512.png"
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ): fileExtension === "xls" ? (
                <img
                  src="http://getdrawings.com/free-icon/excel-document-icon-56.png"
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ):<MdFileCopy className="text-lg" />}
            </>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <div
      className="h-[93vh] flex flex-col"
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeavHandler}
      onDrop={onDragDropHandler}
    >
      {/* post content */}
      <div
        className={`flex-grow overflow-y-auto px-[3%] pt-[1vh] ${
          user ? "max-h-[88vh]" : "max-h-[93vh]"
        }`}
      >
        {isPostLoading && (
          <div className="p-10">
            <Loading mainText={"Post Loading..."} />
          </div>
        )}
        {posts?.length === 0 && !isPostLoading && <div>No Posts Yet</div>}
        {posts?.length > 0 && !isPostLoading && (
          <>
            {posts.map((postItem) => {
              return (
                <div
                  key={postItem?._id}
                  className="mb-5 bg-white shadow-lg p-3 relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPostMore((prev) => {
                      return {
                        ...prev,
                        selectedId: null,
                      };
                    });
                  }}
                >
                  {/* more option */}
                  {user ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPostMore((prev) => {
                          return {
                            ...prev,
                            selectedId:
                              prev?.selectedId === postItem?._id
                                ? null
                                : postItem?._id,
                          };
                        });
                      }}
                      className="absolute right-1.5 top-1.5 z-0 text-xl text-green-600"
                    >
                      <RiMore2Fill />
                    </button>
                  ) : null}
                  {/* option pop up */}
                  {user && (
                    <div
                      className={`absolute right-0 top-1.5 z-10 bg-white shadow-lg transition-transform ease-in-out duration-150 ${
                        postMore?.selectedId === postItem?._id
                          ? "scale-100"
                          : "scale-0"
                      }`}
                    >
                      {postMore?.options?.map((postMoreItem) => {
                        return (
                          <section key={postMoreItem?.text}>
                            {(postMoreItem?.text === "delete" ||
                              postMoreItem?.text === "edit") &&
                            user?._id === postItem?.userId ? (
                              <div
                                className="flex items-center gap-x-1.5 px-3 py-0.5 cursor-pointer transition-colors ease-in-out duration-150 hover:bg-green-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (postMoreItem?.text === "delete") {
                                    setIsDeletePost(postItem);
                                    setPostMore((prev) => {
                                      return {
                                        ...prev,
                                        selectedId: null,
                                      };
                                    });
                                  }
                                }}
                              >
                                {/* icon */}
                                <postMoreItem.icon className="text-green-600" />
                                {/* text */}
                                <span className="text-sm text-green-700">
                                  {postMoreItem?.text}
                                </span>
                              </div>
                            ) : (postMoreItem?.text === "share" ||
                                postMoreItem?.text === "favorite") &&
                              user?._id !== postItem?.userId ? (
                              <div
                                className="flex items-center gap-x-1.5 px-3 py-0.5 cursor-pointer transition-colors ease-in-out duration-150 hover:bg-green-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                {/* icon */}
                                <postMoreItem.icon className="text-green-600" />
                                {/* text */}
                                <span className="text-sm text-green-700">
                                  {postMoreItem?.text}
                                </span>
                              </div>
                            ) : null}
                          </section>
                        );
                      })}
                    </div>
                  )}
                  {/* text */}
                  <div className="text-sm ml-[3%] py-3">
                    <p>{postItem?.text}</p>
                  </div>
                  {/* control */}
                  <div className="flex items-center gap-x-3 border-bv border-green-600 py-1.5">
                    {/* author */}
                    <div className="flex items-center gap-x-1">
                      {/* profile */}
                      <div className="w-[24px] bg-green-600 text-white flex items-center justify-center aspect-square rounded-full overflow-hidden">
                        <UserProfile userId={postItem?.userId} />
                      </div>
                      {/* username */}
                      <div className="text-sm text-gray-700">
                        <Username _id={postItem?.userId} />
                      </div>
                    </div>
                    {/* actions*/}
                    <div className="flex items-center gap-x-3">
                      {/* like */}
                      <button className="text-green-600 flex items-center">
                        <span className="font-medium mr-1 text-xs mt-1.5">
                          {12}
                        </span>
                        {true ? <FaThumbsUp /> : <FaRegThumbsUp />}
                      </button>
                      {/* favorite */}
                      <button className="text-green-600 flex items-center text-lg mt-1">
                        {true ? <MdFavorite /> : <MdFavoriteBorder />}
                      </button>
                      {/* comments */}
                      <button className="text-green-600 flex items-center text-lg mt-1">
                        <span className="font-medium mr-1 text-xs">3</span>
                        {true ? (
                          <MdModeComment />
                        ) : (
                          <MdOutlineModeComment />
                        )}{" "}
                        <span className="text-sm text-gray-700 ml-1">
                          comments
                        </span>
                      </button>
                    </div>
                    {/* date */}
                    <div>
                      <span className="text-xs text-green-600">
                        {formatDistanceToNow(new Date(postItem?.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      {user ? (
        <>
          {/* new post form */}
          <div className="bg-white px-[3%] py-1 flex items-center gap-x-3">
            {/* file picker */}
            <div className="self-end">
              <input
                type="file"
                name="files"
                hidden
                multiple
                id="post-file-picker"
                onChange={filesInputChangeHandler}
              />
              <label htmlFor="post-file-picker">
                <MdAttachFile className="text-2xl rotate-[24deg] cursor-pointer text-green-600" />
              </label>
            </div>
            {/* text in */}
            <div className="flex-grow py-0.5 px-1.5 border border-green-600 rounded-sm">
              <textarea
                className="focus:outline-none focus:ring-0 border-none p-0 w-full h-[17px] max-h-[72vh] resize-none bg-transparent m-0 text-sm"
                name=""
                id="post-text-input"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder="text . . ."
                onKeyUp={(e) => {
                  adjustPostTextAreaHeight(e);
                }}
              ></textarea>
            </div>
            {/* send button */}
            <div className="self-end">
              {isNewPostUploading && files?.length === 0 ? (
                <div className="w-[28px] aspect-square rounded-full border-4 border-green-600 border-r-transparent animate-spin"></div>
              ) : (
                <GrSend
                  className="text-green-600 text-2xl cursor-pointer"
                  onClick={() => {
                    formSubmitHandler();
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* delete post item pop up */}
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-black/35 z-50 ${
          isDeletePost ? "scale-100" : "scale-0"
        }`}
      >
        {/* confirm screen */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-5">
          {isPostDeleting ? (
            <div className="p-10">
              <Loading mainText={"Deleting post..."} />
            </div>
          ) : (
            <>
              {/* icon */}
              <div className="flex items-center justify-center mb-1.5">
                <div className="w-[24px] aspect-square rounded-full border border-red-500 flex items-center justify-center text-red-500 bg-red-100">
                  <IoIosWarning />
                </div>
              </div>
              {/* text */}
              <div className="text-center">
                <p className="text-gray-700">
                  Are you sure to delete this post ?
                </p>
                <p className="text-sm text-red-500 italic">
                  Remember this action is undone.
                </p>
              </div>
              {/* buttons */}
              <div className="flex items-center justify-evenly mt-3">
                <button
                  className="px-3 py-0.5 rounded-sm text-sm bg-gray-500 text-white transition-colors ease-in-out duration-150 hover:bg-gray-400"
                  onClick={() => {
                    setIsDeletePost(null);
                  }}
                >
                  cancel
                </button>

                <button
                  className="px-3 py-0.5 rounded-sm text-sm bg-red-500 text-white transition-colors ease-in-out duration-150 hover:bg-red-400"
                  onClick={() => {
                    dispatch(deletePost(isDeletePost?._id));
                  }}
                >
                  delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* add files pop up */}
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-black/35 z-50 ${
          files?.length > 0 ? "scale-100" : "scale-0"
        }`}
      >
        {/* confirm screen */}
        <div className="absolute left-[30%] top-1/2 -translate-y-1/2 bg-white rounded-sm p-5">
          {isNewPostUploading ? (
            <div className="p-10">
              <Loading mainText={"Uploading ..."} />
            </div>
          ) : (
            <>
              {/* files list */}
              {files.map((fileItem, index) => {
                return (
                  <div className="mb-1 flex items-center justify-between gap-x-3">
                    {/* icon & name-size */}
                    <div className="flex items-center gap-x-3">
                      {/* icons */}
                      {fileProfile(fileItem)}
                      {/* file name && size */}
                      <div>
                        {/* name */}
                        <div className="text-sm font-medium">
                          <span>{fileItem?.name}</span>
                        </div>
                        {/* sizw */}
                        <div className="text-xs text-green-600">
                          <span>
                            {filesize(fileItem?.size, { standard: "jedec" })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* delete */}
                    <div className="self-start">
                      <div
                        className="w-[16px] aspect-square rounded-full transition-colors ease-in-out duration-150  border border-transparent hover:border-red-600 flex items-center justify-center text-sm cursor-pointer text-red-600"
                        onClick={() => {
                          removeFile(index);
                        }}
                      >
                        <IoMdClose />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* description */}
              <div className="mt-3 w-[200px] sm:w-[250px] md:w-full border border-green-600 rounded-sm px-3 pb-0.5 pt-1 text-sm flex items-center justify-center">
                <textarea
                  value={fileDescription}
                  onChange={(e) => {
                    setFileDescription(e.target.value);
                  }}
                  onKeyUp={adjustFilesDescriptionTextAreaHeight}
                  className="w-full resize-none focus:outline-none focus:ring-0 p-0 h-[24px] max-h-[300px]"
                  name="text"
                  id="files-description"
                  placeholder="description"
                ></textarea>
              </div>
              {/* buttons */}
              <div className="flex items-center justify-between mt-3">
                <button
                  className="px-3 py-0.5 rounded-sm text-sm bg-gray-500 text-white transition-colors ease-in-out duration-150 hover:bg-gray-400"
                  onClick={() => {
                    setFiles([]);
                  }}
                >
                  cancel
                </button>

                <button
                  className="px-3 py-0.5 rounded-sm text-sm bg-green-600 text-white transition-colors ease-in-out duration-150 hover:bg-green-500"
                  onClick={() => {
                    newPostWithFileHandler();
                  }}
                >
                  send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* is deagging pop up */}
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-black/35 z-50 ${
          isFileDragging ? "scale-100" : "scale-0"
        }`}
      >
        {/* confirm screen */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-5 py-10 w-250px sm:w-[300px] md:w-[350px]">
          {/* text */}
          <div className="text-center text-xl font-bold">
            <p className="text-gray-700">Drop here . . .</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
