"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import AchievementsSection from "./components/AchivementSection";
import ExperienceSection from "./components/Experience";
import Header from "./components/Header";
import ProjectsSection from "./components/ProjectSection";
import UserInfo from "./components/UserInfo";
import { API_BASE_URL } from "./constants";
import { Certification } from "./interfaces/cerfication.interface";
import { Experience } from "./interfaces/experience.interface";
import { Hackathon } from "./interfaces/hackathon.interface";
import { Project } from "./interfaces/project.interface";

export default function Home() {
  const [profileImage, setProfileImage] = useState<string>('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqArH_IkLI5NxAG-tvvAIE_3XhaOG_X0N5Ig&s');
    const [bannerImage, setBannerImage] = useState<string>('https://static8.depositphotos.com/1008191/989/i/450/depositphotos_9899389-stock-photo-white-banner-background.jpg');
    const [name, setName] = useState<string>('John Doe');
    const [email, setEmail] = useState<string>('john.doe@example.com');
    const [githubLink, setGithubLink] = useState<string>('');
    const [linkedinLink, setLinkedinLink] = useState<string>('');
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [apiCalled, setApiCalled] = useState<boolean>(false)

    useEffect(() => {
        const queryString = window.location.search;

        // Create a URLSearchParams object from the query string
        const urlParams = new URLSearchParams(queryString);

        // Get the value of the 'name' parameter
        const name = urlParams.get('name');

        if (name === null) {
            setShowAlert(true)
        }
        else {
            setName(name);
            setEmail(`${name}@gmail.com`)
        }
        if (apiCalled === false) {
            console.log(API_BASE_URL)
            axios.get(`${API_BASE_URL}/profiles/${name}`).then(response => {
                const profileData = response.data;
                setExperiences(profileData.experiences);
                setProjects(profileData.projects);
                setHackathons(profileData.hackathons);
                setCertifications(profileData.certifications);
                setGithubLink(profileData.socials?.github)
                setLinkedinLink(profileData.socials?.linkedin)
            });
            setApiCalled(true)
            console.log(experiences)
        }
    }, [apiCalled]);

    if (showAlert) {
        return <>
            <div className="prompt">
                <p>Please add a <strong>name</strong> in following format at the end of string <code>?name=name</code> to the URL to proceed further.</p>
            </div>
        </>
    }

    return (
        <>
            <div className="max-w-screen-lg mx-auto p-4">
                <Header bannerImage={bannerImage} email={email} name={name} profileImage={profileImage} setBannerImage={setBannerImage} setProfileImage={setProfileImage} />
                <UserInfo githubLink={githubLink} setGithubLink={setGithubLink} linkedinLink={linkedinLink} setLinkedinLink={setLinkedinLink} name={name} />
                <ExperienceSection experiences={experiences} setExperiences={setExperiences} name={name} />
                <ProjectsSection projects={projects} setProjects={setProjects} name={name} />
                <AchievementsSection
                    hackathons={hackathons}
                    certifications={certifications}
                    setHackathons={setHackathons}
                    setCertifications={setCertifications}
                    name={name}
                />
            </div>
        </>
    );
}
