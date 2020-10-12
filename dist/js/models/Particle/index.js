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
import Projectile from '../Projectile';
var Particle = /** @class */ (function (_super) {
    __extends(Particle, _super);
    function Particle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.alpha = 1;
        return _this;
    }
    Particle.prototype.update = function (ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        _super.prototype.update.call(this, ctx);
        ctx.restore();
    };
    Particle.prototype.draw = function (ctx) {
        _super.prototype.draw.call(this, ctx);
        this.alpha -= 0.01;
    };
    return Particle;
}(Projectile));
export default Particle;
//# sourceMappingURL=index.js.map