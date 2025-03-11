import Image from 'next/image';
import Logo from '../../public/images/logo.png';

const MedalSetCard = () => {
  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

        <li className="list-row">
          <div>
            <Image className="size-10 rounded-box" src={Logo} alt="image 1" width={100} height={100} />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
          </div>
        </li>

        <li className="list-row">
          <div>
            <Image className="size-10 rounded-box" src={Logo} alt="image 2" width={100} height={100} />
          </div>
          <div>
            <div>Ellie Beilish</div>
            <div className="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
          </div>
        </li>

        <li className="list-row">
          <div>
            <Image className="size-10 rounded-box" src={Logo} alt="image 3" width={100} height={100} />
          </div>
          <div>
            <div>Sabrino Gardener</div>
            <div className="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MedalSetCard;
