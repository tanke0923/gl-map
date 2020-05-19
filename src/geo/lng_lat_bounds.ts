import { LngLat } from "./lng_lat";

/**
 * A `LngLatBounds` object represents a geographical bounding box,
 * defined by its southwest and northeast points in longitude and latitude.
 *
 * If no arguments are provided to the constructor, a `null` bounding box is created.
 *
 * Note that any Mapbox GL method that accepts a `LngLatBounds` object as an argument or option
 * can also accept an `Array` of two {@link LngLatLike} constructs and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatBoundsLike}.
 *
 * @param {LngLatLike} [sw] The southwest corner of the bounding box.
 * @param {LngLatLike} [ne] The northeast corner of the bounding box.
 * @example
 * var sw = new mapboxgl.LngLat(-73.9876, 40.7661);
 * var ne = new mapboxgl.LngLat(-73.9397, 40.8002);
 * var llb = new mapboxgl.LngLatBounds(sw, ne);
 */
export class LngLatBounds {
  _ne: LngLat;
  _sw: LngLat;

  // This constructor is too flexible to type. It should not be so flexible.
  constructor(sw: LngLat, ne: LngLat) {
    if (!sw) {
      // noop
    } else if (ne) {
      this.setSouthWest(sw).setNorthEast(ne);
    }
  }

  /**
   * Set the northeast corner of the bounding box
   *
   * @param {LngLatLike} ne a {@link LngLatLike} object describing the northeast corner of the bounding box.
   * @returns {LngLatBounds} `this`
   */
  setNorthEast(ne: LngLat) {
    this._ne = ne;
    return this;
  }

  /**
   * Set the southwest corner of the bounding box
   *
   * @param {LngLatLike} sw a {@link LngLatLike} object describing the southwest corner of the bounding box.
   * @returns {LngLatBounds} `this`
   */
  setSouthWest(sw: LngLat) {
    this._sw = sw;
    return this;
  }

  /**
   * Extend the bounds to include a given LngLatLike or LngLatBoundsLike.
   *
   * @param {LngLatLike|LngLatBoundsLike} obj object to extend to
   * @returns {LngLatBounds} `this`
   */
  extend(obj: LngLat | LngLatBounds) {
    const sw = this._sw,
      ne = this._ne;
    let sw2, ne2;

    if (obj instanceof LngLat) {
      sw2 = obj;
      ne2 = obj;
    } else if (obj instanceof LngLatBounds) {
      sw2 = obj._sw;
      ne2 = obj._ne;

      if (!sw2 || !ne2) return this;
    }

    if (!sw && !ne) {
      this._sw = new LngLat(sw2.lng, sw2.lat);
      this._ne = new LngLat(ne2.lng, ne2.lat);
    } else {
      sw.lng = Math.min(sw2.lng, sw.lng);
      sw.lat = Math.min(sw2.lat, sw.lat);
      ne.lng = Math.max(ne2.lng, ne.lng);
      ne.lat = Math.max(ne2.lat, ne.lat);
    }

    return this;
  }

  /**
   * Returns the geographical coordinate equidistant from the bounding box's corners.
   *
   * @returns {LngLat} The bounding box's center.
   * @example
   * var llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.getCenter(); // = LngLat {lng: -73.96365, lat: 40.78315}
   */
  getCenter(): LngLat {
    return new LngLat((this._sw.lng + this._ne.lng) / 2, (this._sw.lat + this._ne.lat) / 2);
  }

  /**
   * Returns the southwest corner of the bounding box.
   *
   * @returns {LngLat} The southwest corner of the bounding box.
   */
  getSouthWest(): LngLat {
    return this._sw;
  }

  /**
   * Returns the northeast corner of the bounding box.
   *
   * @returns {LngLat} The northeast corner of the bounding box.
   */
  getNorthEast(): LngLat {
    return this._ne;
  }

  /**
   * Returns the northwest corner of the bounding box.
   *
   * @returns {LngLat} The northwest corner of the bounding box.
   */
  getNorthWest(): LngLat {
    return new LngLat(this.getWest(), this.getNorth());
  }

  /**
   * Returns the southeast corner of the bounding box.
   *
   * @returns {LngLat} The southeast corner of the bounding box.
   */
  getSouthEast(): LngLat {
    return new LngLat(this.getEast(), this.getSouth());
  }

  /**
   * Returns the west edge of the bounding box.
   *
   * @returns {number} The west edge of the bounding box.
   */
  getWest(): number {
    return this._sw.lng;
  }

  /**
   * Returns the south edge of the bounding box.
   *
   * @returns {number} The south edge of the bounding box.
   */
  getSouth(): number {
    return this._sw.lat;
  }

  /**
   * Returns the east edge of the bounding box.
   *
   * @returns {number} The east edge of the bounding box.
   */
  getEast(): number {
    return this._ne.lng;
  }

  /**
   * Returns the north edge of the bounding box.
   *
   * @returns {number} The north edge of the bounding box.
   */
  getNorth(): number {
    return this._ne.lat;
  }

  /**
   * Return the bounding box represented as a string.
   *
   * @returns {string} The bounding box represents as a string of the format
   *   `'LngLatBounds(LngLat(lng, lat), LngLat(lng, lat))'`.
   * @example
   * var llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.toString(); // = "LngLatBounds(LngLat(-73.9876, 40.7661), LngLat(-73.9397, 40.8002))"
   */
  toString() {
    return `LngLatBounds(${this._sw.toString()}, ${this._ne.toString()})`;
  }

  /**
   * Check if the bounding box is an empty/`null`-type box.
   *
   * @returns {boolean} True if bounds have been defined, otherwise false.
   */
  isEmpty() {
    return !(this._sw && this._ne);
  }

  /**
   * Check if the point is within the bounding box.
   *
   * @param {LngLatLike} lnglat geographic point to check against.
   * @returns {boolean} True if the point is within the bounding box.
   * @example
   * var llb = new mapboxgl.LngLatBounds(
   *   new mapboxgl.LngLat(-73.9876, 40.7661),
   *   new mapboxgl.LngLat(-73.9397, 40.8002)
   * );
   *
   * var ll = new mapboxgl.LngLat(-73.9567, 40.7789);
   *
   * console.log(llb.contains(ll)); // = true
   */
  contains(lnglat: LngLat) {
    const { lng, lat } = lnglat;

    const containsLatitude = this._sw.lat <= lat && lat <= this._ne.lat;
    let containsLongitude = this._sw.lng <= lng && lng <= this._ne.lng;
    if (this._sw.lng > this._ne.lng) {
      // wrapped coordinates
      containsLongitude = this._sw.lng >= lng && lng >= this._ne.lng;
    }

    return containsLatitude && containsLongitude;
  }
}
