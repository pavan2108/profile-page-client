import { useState } from "react";
import { editExperience, createExperience, deleteExperience } from "../api/experience";
import { modalStyles } from "../customStyles/modelStyles";
import { Experience } from "../interfaces/experience.interface";
import Modal from 'react-modal';

const ExperienceSection: React.FC<{
    experiences: Experience[];
    setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
    name: string
}> = ({ experiences, setExperiences, name }) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [tempExperience, setTempExperience] = useState<Experience>({
        company: '',
        designation: '',
        duration: '',
    });

    const openModal = (index: number | null) => {
        setCurrentIndex(index);
        if (index !== null) {
            setTempExperience(experiences[index]);
        } else {
            setTempExperience({
                company: '',
                designation: '',
                duration: '',
            });
        }
        setModalIsOpen(true);
    };

    const closeModal = () => setModalIsOpen(false);

    const handleInputChange = (key: keyof Experience, value: string) => {
        setTempExperience(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        if (currentIndex !== null) {
            // Edit existing experience
            await editExperience(name, experiences[currentIndex].id!, tempExperience);
            const updated = [...experiences];
            updated[currentIndex] = tempExperience;
            setExperiences(updated);
        } else {
            // Add new experience
            const experience = await createExperience(name, tempExperience);
            const updated = [...experiences, experience];
            setExperiences(updated);
        }
        closeModal();
    };

    const handleDelete = async (index: number) => {
        await deleteExperience(name, experiences[index].id!);
        const updated = experiences.filter((_, i) => i !== index);
        setExperiences(updated);
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold border-b-2 pb-2 border-gray-200">Experience</h2>
            {experiences.length > 0 ? (
                experiences.map((exp, index) => (
                    <div key={index} className="mt-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{exp.company}</p>
                            <p>{exp.designation}</p>
                            <p>{exp.duration}</p>
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
                <p className="text-gray-600">No experiences added yet.</p>
            )}
            <button
                onClick={() => openModal(null)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
                Add Experience
            </button>

            {/* Modal for Experience */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Experience Modal"
                style={modalStyles}
                ariaHideApp={false}
            >
                <h2 className="text-2xl font-bold mb-4">
                    {currentIndex !== null ? 'Edit Experience' : 'Add Experience'}
                </h2>
                <input
                    type="text"
                    placeholder="Company"
                    value={tempExperience.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Designation"
                    value={tempExperience.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Duration"
                    value={tempExperience.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
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

export default ExperienceSection