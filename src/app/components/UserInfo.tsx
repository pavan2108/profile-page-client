import { updateUserInfo } from "../api/user_info";

const UserInfo: React.FC<{
    githubLink: string;
    linkedinLink: string;
    setGithubLink: (url: string) => void;
    setLinkedinLink: (url: string) => void;
    name: string
}> = ({ githubLink, linkedinLink, setGithubLink, setLinkedinLink, name }) => {

    const updateSocials = async() => {
        await updateUserInfo(name, {
            github: githubLink,
            linkedin: linkedinLink
        })
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold border-b-2 pb-2 border-gray-200">Social Links</h2>
            <div className="mt-4">
                <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="GitHub URL"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="url"
                    value={linkedinLink}
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    placeholder="LinkedIn URL"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
            </div>
            <button
            type="button"
            onClick={updateSocials}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
                Update
            </button>
        </div>
    );
};

export default UserInfo