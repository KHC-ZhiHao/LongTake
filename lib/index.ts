import { helper as _helper } from './helper'
import { Sprite as _Sprite } from './sprite'
import { Loader as _Loader } from './loader'
import { Animate as _Animate } from './animate'
import { LongTake as _LongTake } from './longtake'

export type Sprite = _Sprite
export type Loader = _Loader
export type Animate = _Animate
export type LongTake = _LongTake

export const helper = _helper
export const Sprite = _Sprite
export const Loader = _Loader
export const Animate = _Animate
export const LongTake = _LongTake

module.exports = LongTake
module.exports.LongTake = LongTake

export default LongTake
