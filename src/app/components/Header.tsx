import { FaCamera } from "react-icons/fa";

const Header: React.FC<{
    profileImage: string;
    bannerImage: string;
    setProfileImage: (url: string) => void;
    setBannerImage: (url: string) => void;
    name: string;
    email: string;
}> = ({ profileImage, bannerImage, setProfileImage, setBannerImage, name, email }) => {
    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setProfileImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setBannerImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <div className="relative">
            <img src={bannerImage} alt="Banner" className="w-full h-40 object-cover" />
            <div className="absolute top-16 left-4 flex items-center space-x-4">
                <div className="relative">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white"
                    />
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
                        <FaCamera className="text-gray-600" />
                        <input
                            type="file"
                            onChange={handleProfileImageChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p>{email}</p>
                </div>
            </div>
            <label className="absolute top-4 right-4 bg-white rounded-full p-2 cursor-pointer">
                <FaCamera className="text-gray-600" />
                <input
                    type="file"
                    onChange={handleBannerImageChange}
                    className="hidden"
                />
            </label>
        </div>
    );
};

export default Header;