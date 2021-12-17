import Head from "next/head";
import Image from "next/image";
import { Icon } from '@iconify/react';
import ProjectItem from "../components/ProjectItem";

function profile() {
    return (
        <div className="profile">
            <Head>
                <title>Profile</title>
            </Head>
            <div className="profile_container">
                <div className="profile_navbar max-w-screen-xl mx-auto w-full h-16 flex justify-between items-center p-5">
                    <img src="images/logo.png" alt="" className=" logo w-44 flex justify-between items-center mt-5" />
                    <a href="" className="flex gap-2">
                        <div className="hidden sm:flex">Logout</div>

                        <img src="https://img.icons8.com/external-line-icons-royyan-wijaya/64/000000/external-interface-gloria-interface-line-ii-line-icons-royyan-wijaya-6.png" className="w-6" />
                    </a>
                </div>
                <div className="bg-gray-200">
                    <div className="profile_mainSection max-w-screen-xl mx-auto w-full  h-auto p-5 md:py-10 md:flex justify-evenly items-start gap-8">
                        <div className="profile_details flex justify-evenly items-center md:flex-col gap-2">
                            <img src="https://www.whatsappimages.in/wp-content/uploads/2021/04/Sad-Whatsapp-Dp-Profile-Photo-HD-Download.jpg" alt="" className="rounded-full w-28 md:w-48" />
                            <div className="flex flex-col w-full">
                                <div className="text-xl font-semibold md:hidden">Rajib Mondal</div>
                                <div className="tracking-wide md:font-semibold">Co-Founder at devshowcase</div>
                                <div className="hidden md:flex my-1 gap-1">
                                    <img src="https://img.icons8.com/material-outlined/24/000000/marker.png" />
                                    New Delhi, India
                                </div>
                                <div className="flex gap-6 mt-2 md:hidden">
                                    <a href="">
                                        <img src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png" />
                                    </a>
                                    <a href="">
                                        <img src="https://img.icons8.com/material-outlined/24/000000/instagram-new--v1.png" className="w-8" />
                                    </a>
                                    <a href="">
                                        <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-3/5">
                            <div className="profile_description">
                                <div className="hidden md:flex text-3xl tracking-wider mb-4 font-semibold">Rajib Mondal</div>
                                <div className="hidden md:flex justify-start items-center flex-wrap gap-1 mt-3 mb-5">
                                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">Designer</div>
                                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">Web Developer</div>
                                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">React js</div>
                                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">REST API</div>
                                </div>
                                <div className="flex justify-evenly items-center mt-2">
                                    <div className="w-1/2 bg-white text-blue-700 font-semibold text-center p-1 rounded-md tracking-wider">About</div>
                                    <div className="w-1/2 text-center p-1 rounded-md text-gray-600 tracking-wider">Experience</div>
                                </div>
                                <div className="my-3">
                                    <div>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam libero architecto numquam quisquam reiciendis ipsam ex odio, debitis id magni?
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quae!
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <a className="tracking-wider text-blue-700 font-semibold" href="">www.abckuchbhi.com</a>
                                        <div className="hidden gap-4 mt-2 md:flex">
                                            <a href="">
                                                <img src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png" />
                                            </a>
                                            <a href="">
                                                <img src="https://img.icons8.com/material-outlined/24/000000/instagram-new--v1.png" className="w-8" />
                                            </a>
                                            <a href="">
                                                <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex md:hidden justify-start items-center flex-wrap gap-1 mt-4">
                                        <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">Designer</div>
                                        <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">Web Developer</div>
                                        <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">React js</div>
                                        <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">REST API</div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile_buttons flex justify-between items-center text-center gap-2 font-semibold ">
                                <a href="" className="w-1/2 md:w-64 rounded-md bg-white p-2 flex items-center justify-center gap-1">
                                    <img src="https://img.icons8.com/material-rounded/24/4a90e2/mail.png" />
                                    Send Message
                                </a>
                                <a href="" className="md:hidden w-1/2 rounded-md bg-white p-2 flex items-center justify-center gap-1">
                                    <img src="https://img.icons8.com/material-rounded/24/4a90e2/add.png" />
                                    Add Project
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_projectSection w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-3 mt-3 px-5 justify-center flex-wrap">
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                </div>
            </div>
        </div >
    )
}

export default profile
