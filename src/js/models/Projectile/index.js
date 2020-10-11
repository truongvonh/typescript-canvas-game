var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import BaseModel from "../Base";
var Projectile = /** @class */ (function (_super) {
    __extends(Projectile, _super);
    function Projectile(x, y, color, radius, velocity) {
        var _this = _super.call(this, x, y, color, radius) || this;
        _this.velocity = velocity;
        return _this;
    }
    Projectile.prototype.update = function (ctx) {
        this.draw(ctx);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
    return Projectile;
}(BaseModel));
export default Projectile;
