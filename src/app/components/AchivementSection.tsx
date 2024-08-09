import { useState } from "react";
import { editCertification, createCertification, deleteCertification } from "../api/certificate";
import { editHackathon, createHackathon, deleteHackathon } from "../api/hackathon";
import { modalStyles } from "../customStyles/modelStyles";
import { Certification } from "../interfaces/cerfication.interface";
import { Hackathon } from "../interfaces/hackathon.interface";
import Modal from 'react-modal';

const AchievementsSection: React.FC<{
    hackathons: Hackathon[];
    certifications: Certification[];
    setHackathons: React.Dispatch<React.SetStateAction<Hackathon[]>>;
    setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
    name: string;
}> = ({ hackathons, certifications, setHackathons, setCertifications, name }) => {
    const [hackathonModalIsOpen, setHackathonModalIsOpen] = useState<boolean>(false);
    const [certificationModalIsOpen, setCertificationModalIsOpen] = useState<boolean>(false);
    const [currentHackathonIndex, setCurrentHackathonIndex] = useState<number | null>(null);
    const [currentCertificationIndex, setCurrentCertificationIndex] = useState<number | null>(null);
    const [tempHackathon, setTempHackathon] = useState<Hackathon>({
        name: '',
        year: '',
        achievements: '',
    });
    const [tempCertification, setTempCertification] = useState<Certification>({
        name: '',
        issuingAuthority: '',
    });

    const openHackathonModal = (index: number | null) => {
        setCurrentHackathonIndex(index);
        if (index !== null) {
            setTempHackathon(hackathons[index]);
        } else {
            setTempHackathon({
                name: '',
                year: '',
                achievements: '',
            });
        }
        setHackathonModalIsOpen(true);
    };

    const openCertificationModal = (index: number | null) => {
        setCurrentCertificationIndex(index);
        if (index !== null) {
            setTempCertification(certifications[index]);
        } else {
            setTempCertification({
                name: '',
                issuingAuthority: '',
            });
        }
        setCertificationModalIsOpen(true);
    };

    const closeHackathonModal = () => setHackathonModalIsOpen(false);
    const closeCertificationModal = () => setCertificationModalIsOpen(false);

    const handleHackathonInputChange = (key: keyof Hackathon, value: string) => {
        setTempHackathon(prev => ({ ...prev, [key]: value }));
    };

    const handleCertificationInputChange = (key: keyof Certification, value: string) => {
        setTempCertification(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveHackathon = async () => {
        if (currentHackathonIndex !== null) {
            await editHackathon(name, hackathons[currentHackathonIndex].id!, tempHackathon);
            const updated = [...hackathons];
            updated[currentHackathonIndex] = tempHackathon;
            setHackathons(updated);
        } else {
            const hackathon = await createHackathon(name, tempHackathon);
            const updated = [...hackathons, hackathon];
            setHackathons(updated);
        }
        closeHackathonModal();
    };

    const handleSaveCertification = async () => {
        if (currentCertificationIndex !== null) {
            await editCertification(name, certifications[currentCertificationIndex].id!, tempCertification);
            const updated = [...certifications];
            updated[currentCertificationIndex] = tempCertification;
            setCertifications(updated);
        } else {
            const certificate = await createCertification(name, tempCertification);
            const updated = [...certifications,
                certificate
            ];
            setCertifications(updated);
        }
        closeCertificationModal();
    };

    const handleDeleteHackathon = async (index: number) => {
        await deleteHackathon(name, hackathons[index].id!);
        const updated = hackathons.filter((_, i) => i !== index);
        setHackathons(updated);
    };

    const handleDeleteCertification = async (index: number) => {
        await deleteCertification(name, certifications[index].id!);
        const updated = certifications.filter((_, i) => i !== index);
        setCertifications(updated);
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold border-b-2 pb-2 border-gray-200">Achievements</h2>
            <div>
                <h3 className="text-xl font-semibold mt-8">Hackathons</h3>
                {hackathons.length > 0 ? (
                    hackathons.map((hackathon, index) => (
                        <div key={index} className="mt-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{hackathon.name}</p>
                                <p>{hackathon.year}</p>
                                <p>{hackathon.achievements}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openHackathonModal(index)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteHackathon(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No hackathons added yet.</p>
                )}
                <button
                    onClick={() => openHackathonModal(null)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                    Add Hackathon
                </button>
            </div>

            <div>
                <h3 className="text-xl font-semibold mt-8">Certifications</h3>
                {certifications.length > 0 ? (
                    certifications.map((certification, index) => (
                        <div key={index} className="mt-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{certification.name}</p>
                                <p>{certification.issuingAuthority}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openCertificationModal(index)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteCertification(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No certifications added yet.</p>
                )}
                <button
                    onClick={() => openCertificationModal(null)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                    Add Certification
                </button>
            </div>

            {/* Modal for Hackathon */}
            <Modal
                isOpen={hackathonModalIsOpen}
                onRequestClose={closeHackathonModal}
                contentLabel="Hackathon Modal"
                style={modalStyles}
            >
                <h2 className="text-2xl font-bold mb-4">
                    {currentHackathonIndex !== null ? 'Edit Hackathon' : 'Add Hackathon'}
                </h2>
                <input
                    type="text"
                    placeholder="Hackathon Name"
                    value={tempHackathon.name}
                    onChange={(e) => handleHackathonInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Year"
                    value={tempHackathon.year}
                    onChange={(e) => handleHackathonInputChange('year', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Achievements"
                    value={tempHackathon.achievements}
                    onChange={(e) => handleHackathonInputChange('achievements', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleSaveHackathon}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={closeHackathonModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>

            {/* Modal for Certification */}
            <Modal
                isOpen={certificationModalIsOpen}
                onRequestClose={closeCertificationModal}
                contentLabel="Certification Modal"
                style={modalStyles}
            >
                <h2 className="text-2xl font-bold mb-4">
                    {currentCertificationIndex !== null ? 'Edit Certification' : 'Add Certification'}
                </h2>
                <input
                    type="text"
                    placeholder="Certification Name"
                    value={tempCertification.name}
                    onChange={(e) => handleCertificationInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Issuing Authority"
                    value={tempCertification.issuingAuthority}
                    onChange={(e) => handleCertificationInputChange('issuingAuthority', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={handleSaveCertification}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={closeCertificationModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AchievementsSection