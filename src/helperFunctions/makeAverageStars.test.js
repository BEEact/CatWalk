import averageReviewScore from './averageReviewScore';

describe('makeAverageStars', () => {
  it('returns handles whole number scores', () => {
    const score = 4;

    const expectedArr = [1,1,1,1,0];
    const actualArr = makeAverageStars(score);

    expect(actualArr.length).toEqual(5);
    expect(actualArr).toEqual(expectedArr);
  });
  it('returns handles fractional number scores', () => {
    const score = 3.7;

    const expectedArr = [1,1,1,2,0];
    const actualArr = makeAverageStars(score);

    expect(actualArr.length).toEqual(5);
    expect(actualArr).toEqual(expectedArr);
  });
});
