type _omittable<R, O> = R | (R & O);
export type Omittable<R, O1, O2 = never, O3 = never> = _omittable<_omittable<_omittable<R, O1>, O2>, O3>;
