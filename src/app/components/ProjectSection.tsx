import { useState } from "react";
import { editProject, createProject, deleteProject } from "../api/project";
import { modalStyles } from "../customStyles/modelStyles";
import { Project } from "../interfaces/project.interface";
import Modal from 'react-modal';

const ProjectsSection: React.FC<{
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    name: string
}> = ({ projects, setProjects, name }) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [tempProject, setTempProject] = useState<Project>({
        name: '',
        description: '',
        link: '',
    });

    const openModal = (index: number | null) => {
        setCurrentIndex(index);
        if (index !== null) {
            setTempProject(projects[index]);
        } else {
            setTempProject({
                name: '',
                description: '',
                link: '',
            });
        }
        setModalIsOpen(true);
    };

    const closeModal = () => setModalIsOpen(false);

    const handleInputChange = (key: keyof Project, value: string) => {
        setTempProject(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        if (currentIndex !== null) {
            // Edit existing project
            await editProject(name, projects[currentIndex].id!, tempProject);
            const updated = [...projects];
            updated[currentIndex] = tempProject;
            setProjects(updated);
        } else {
            // Add new project
            const project = await createProject(name, tempProject);
            const updated = [...projects, project];
            setProjects(updated);
        }
        closeModal();
    };

    const handleDelete = async (index: number) => {
        await deleteProject(name, projects[index].id!);
        const updated = projects.filter((_, i) => i !== index);
        setProjects(updated);
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold border-b-2 pb-2 border-gray-200">Projects</h2>
            {projects.length > 0 ? (
                projects.map((proj, index) => (
                    <div key={index} className="mt-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{proj.name}</p>
                            <p>{proj.description}</p>
                            {proj.link && (
                                <a href={proj.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                                    {proj.link}
                                </a>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => openModal(index)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No projects added yet.</p>
            )}
            <button
                onClick={() => openModal(null)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
                Add Project
            </button>

            {/* Modal for Project */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Project Modal"
                style={modalStyles}
            >
                <h2 className="text-2xl font-bold mb-4">
                    {currentIndex !== null ? 'Edit Project' : 'Add Project'}
                </h2>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={tempProject.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <textarea
                    placeholder="Description"
                    value={tempProject.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="url"
                    placeholder="Link (optional)"
                    value={tempProject.link}
                    onChange={(e) => handleInputChange('link', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProjectsSection