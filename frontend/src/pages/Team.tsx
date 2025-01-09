import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
    {
        name: "Harshit Manchanda",
        skillset: "Frontend Developer",
        socials: { email: "harshit@example.com", linkedin: "/in/johndoe" },
        image: "/harshit.png",
    },
    {
        name: "Jane Smith",
        skillset: "Backend Developer",
        socials: { email: "jane@example.com", linkedin: "/in/janesmith" },
        image: "/harshit.png",
    },
    // Add more team members as needed
];

function TeamMemberCard({ member }) {
    return (
        <Card className="w-[300px]">
            <CardHeader>
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                />
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                <div className="opacity-75">{member.skillset}</div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <a
                        href={`mailto:${member.socials.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Mail size={24} />
                    </a>
                    <a
                        href={`https://linkedin.com${member.socials.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin size={24} />
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Team() {
    return (
        <div className="flex flex-col gap-4 p-8 ">
            <h1 className="font-bold mb-4">Team Members</h1>
            <div className="flex flex-wrap gap-16 justify-evenly w-max">
                {teamMembers.map((member) => (
                    <TeamMemberCard
                        key={member.name}
                        member={member}
                    />
                ))}
            </div>
        </div>
    );
}
