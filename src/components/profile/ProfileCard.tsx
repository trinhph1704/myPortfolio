import { motion } from 'framer-motion';
import { Profile } from '../../data/portfolioData';
import ProfileInfo from './ProfileInfo';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center"
    >
      <div className="relative mb-6">
        <img
          src={profile.avatar}
          alt={profile.name}
          onClick={() => window.open(profile.avatar, '_blank')}
          role="button"
          aria-label="Open portrait"
          className="w-56 h-56 rounded-full object-cover border-2 border-portfolio-accent/30 shadow-lg shadow-portfolio-accent/10 cursor-zoom-in"
          style={{ objectPosition: 'center 25%' }}
        />
      </div>
      <h1 className="text-xl font-bold text-portfolio-text-primary mb-1 text-center">{profile.name}</h1>
      <div className="w-full mt-4">
        <ProfileInfo profile={profile} />
      </div>
    </motion.div>
  );
}
