import { groupBy, mapValues, sample } from "lodash";
import { User } from "../page/Layout";

const MAX_RETRY = 10;

export const makeFamilies = (participants: User[]) =>
  Object.values(
    mapValues(groupBy(participants, "family"), (people) =>
      people.map((p) => p.NO_ID_FIELD)
    )
  );

export const mySecretSanta = (
  participants: User[]
): Record<User["NO_ID_FIELD"], User["NO_ID_FIELD"]> => {
  const families = makeFamilies(participants);
  const userIds = families.flat();

  let retry = 0;
  if (retry < MAX_RETRY) {
    try {
      const acc = {};
      type Choices = keyof typeof acc;
      let pool = userIds;
      userIds.forEach((uid) => {
        const ownFamily = families.find((family) => family.includes(uid));
        const [partner] = ownFamily?.filter((u) => u !== uid) as Choices[];
        const partnerChoiceFamily = families.find((family) =>
          family.includes(partner)
        );
        const filteredPool = pool.filter(
          (uuid) =>
            !ownFamily?.includes(uuid) && !partnerChoiceFamily?.includes(uuid)
        );

        const choice = sample(filteredPool);

        if (!choice) {
          retry++;
          throw new Error("No possible solutions, will retry if possible");
        }

        pool = pool.filter((uuid) => !(choice === uuid));

        // @ts-ignore
        acc[uid] = choice;
      });
      return acc;
    } catch (e) {
      return mySecretSanta(participants);
    }
  }
  throw new Error(`Max number of retry reached ${retry}. Try again manually`);
};
